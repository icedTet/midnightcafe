// const accountSid = 'AC9a7c7a3064007c8b95c6edc4f1a07b2c';
// const authToken = '[AuthToken]';
// const client = require('twilio')(accountSid, authToken);

// client.messages
//     .create({
//         body: '「Midnight Cafe」 Your order #4230 is now ready for pickup!',
//         from: '+18333270003',
//         to: '+16502507136'
//     })
//     .then(message => console.log(message.sid))
//     .done();

import type { NextApiRequest, NextApiResponse } from "next";
import { Twilio } from "twilio";
import Mongo from "../../../utils/clients/Mongo";
import { ObjectId } from "mongodb";
import { Encryptions } from "../../../utils/Encryptions";
import { User } from "../../../utils/types";
import Stripe from "stripe";
import {
  CupsizeModiferNames,
  GenericProduct,
  PreferenceModifiers,
  ToppingModiferNames,
  cupsizePrices,
  products,
  toppingPrices,
} from "../../../utils/Items";
import { LineItem } from "@stripe/stripe-js";
import { processPromos } from "../../../utils/promos";

const stripe = new Stripe(process.env.STRIPE_SECRET!);
const CURRENCY = "usd";
type Data = {
  sessionID: string;
  sessionURL: string;
};
type Error = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (req.method === "POST") {
    let {
      basket,
      phoneNumber,
      name,
      deliveryAddress,
      signupForAccount,
      delivery,
    } = req.body as {
      basket: {
        product: GenericProduct;
        preferences: PreferenceModifiers;
        quantity: number;
      }[];
      phoneNumber: string;
      name: string;
      delivery: boolean;
      deliveryAddress: string;
      signupForAccount: boolean;
    };
    // const { firstName, lastName, phoneNumber, marketingAllowed } = req.query;
    const lineItems: {
      price_data: {
        currency: string;
        product_data: {
          name: string;
          images: string[];
          description: string;
        };
        unit_amount: number;
      };
      quantity: number;
    }[] = [];

    if (!basket) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const token = req.headers.authorization;
    const userID =
      token &&
      token.includes("Bearer") &&
      (await Encryptions.decryptUserToken(token.replace("Bearer ", "")));
    const user = await Mongo.then(async (mongo) =>
      userID && mongo.db("Users").collection("user").findOne({ _id: new ObjectId(userID) })
    ) as User | undefined;
    if (user) {
      phoneNumber = user.phoneNumber;
      name = `${user.firstName} ${user.lastName}`.trim();
    }
    basket.map((item) => {
      const product = item.product;
      const officialProduct = products.find((p) => p.id === product.id);
      if (!officialProduct) {
        return res
          .status(400)
          .json({ error: `Product ${product.id} not found` });
      }
      let price = officialProduct.price * 100;
      let lineItemDescription = ``;
      if (
        item.product.modifiers.includes("cupsize") &&
        item.preferences.cupsize !== undefined
      ) {
        lineItemDescription += `| ${
          CupsizeModiferNames[item.preferences.cupsize]
        } |`;
        price += cupsizePrices[item.preferences.cupsize!] * 100;
      }
      if (
        item.product.modifiers.includes("ice") &&
        item.preferences.ice !== undefined
      ) {
        lineItemDescription += `| ${item.preferences.ice}% Ice |`;
      }
      if (
        item.product.modifiers.includes("sugar") &&
        item.preferences.sugar !== undefined
      ) {
        lineItemDescription += `| ${item.preferences.sugar}% Sugar |`;
      }
      if (
        item.product.modifiers.includes("toppings") &&
        item.preferences.toppings !== undefined &&
        item.preferences.toppings.length > 0
      ) {
        lineItemDescription += `| ${item.preferences.toppings
          .map((top) => ToppingModiferNames[top])
          ?.join(", ")}\n |`;
        item.preferences.toppings?.map((topping) => {
          price += toppingPrices[topping] * 100;
        });
      }
      if (!lineItemDescription) {
        lineItemDescription = officialProduct.description;
      }
      lineItems.push({
        price_data: {
          currency: CURRENCY,
          product_data: {
            name: officialProduct.name,
            images: [
              `${`https://midnightcafe-git-main-icedtet.vercel.app/`}${
                officialProduct.image
              }`,
            ],

            description: lineItemDescription + `§${officialProduct.id}`,
          },
          unit_amount: price,
        },

        quantity: item.quantity,
      });
    });
    console.log(lineItems);
    if (delivery) {
      lineItems.push({
        price_data: {
          currency: CURRENCY,
          product_data: {
            name: "Delivery Fee",
            images: [
              "https://midnightcafe-git-main-icedtet.vercel.app/logo.png",
            ],
            description: "Delivery Fee",
          },
          unit_amount: 100,
        },
        quantity: 1,
      });
    }
    const promos = await processPromos({
      basket,
      delivery,
      deliveryAddress,
      lineItems,
      name,
      phoneNumber,
      signupForAccount,
      userid: userID || undefined,
    });
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.origin}/track/{CHECKOUT_SESSION_ID}?thanks=true`,
      cancel_url: `${req.headers.origin}/menu`,
      automatic_tax: { enabled: false },
      customer_email: `reciepts${Date.now()}@midnightcafeaz.com`,
      discounts: [],
    });
    const mongo = await Mongo;
    await mongo
      .db("Users")
      .collection("pendingOrders")
      .insertOne({
        sessionID: session.id,
        userID: userID,
        phoneNumber,
        basket: basket.map((item) => ({
          product: products.find((p) => p.id === item.product.id),
          preferences: item.preferences,
          quantity: item.quantity,
        })),
        total: session.amount_total,
        subtotal: session.amount_subtotal,
        name,
        delivery,
        deliveryAddress,
        signupForAccount,
        promos,
      });
    if (!session?.url) {
      return res.status(400).json({ error: "Failed to create session" });
    }

    return res
      .status(200)
      .json({ sessionID: session.id, sessionURL: session.url });
  }
}
