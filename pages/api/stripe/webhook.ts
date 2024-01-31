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
import { writeFileSync } from "fs";

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
    const event = req.body;
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        console.log(session);
        let sessionID = session.id;
        const mongo = await Mongo;
        const db = mongo.db("Users");
        const collection = db.collection("pendingOrders");
        const order = await collection.findOne({ sessionID });
        if (!order) {
          return res.status(400).json({ error: "Order not found" });
        }
        const orderCollection = db.collection("orders");
        await orderCollection.insertOne({
          ...order,
          sessionID,
          date: Date.now(),
          pointsGained: order.total * (0.5 + Math.random()),
        });
        await collection.deleteOne({ sessionID });
        // get user if exists
        const userCollection = db.collection("user");
        const user = order.phoneNumber
          ? await userCollection.findOne({ phoneNumber: order.phoneNumber })
          : await userCollection.findOne({ _id: new ObjectId(order.userID) });
        if (user) {
          await userCollection.updateOne(
            { _id: user._id },
            { $inc: { points: order.total * (0.5 + Math.random()) } }
          );
          if (!order.phoneNumber) {
            order.phoneNumber = user.phoneNumber;
          }
          if (!order.name) {
            order.name = `${user.firstName} ${user.lastName}`;
          }
        } else {
          if (order.signupForAccount) {
            await userCollection.insertOne({
              _id: new ObjectId(),
              firstName: order.name.split(" ")[0],
              lastName: order.name.split(" ")[1],
              phoneNumber: order.phoneNumber,
              marketingAllowed: true,
              points: order.total * (0.5 + Math.random()),
            });
          }
        }
        const generateFields = [];
        for (let i = 0; i < order.basket.length; i++) {
          const item = order.basket[i] as {
            product: GenericProduct;
            preferences: PreferenceModifiers;
            quantity: number;
          };
          const prefs = item.preferences as PreferenceModifiers;
          const product = products.find((p) => p.id === item.product.id);
          let desc = ``;
          if (product?.modifiers.includes("cupsize")) {
            if (prefs.cupsize) {
              desc += `- ${CupsizeModiferNames[prefs.cupsize]}\n`;
            }
          }
          if (product?.modifiers.includes("toppings")) {
            if (prefs.toppings) {
              desc += `- ${prefs.toppings
                .map((t) => ToppingModiferNames[t])
                .join(", ")}\n`;
            } else {
              desc += `- No Toppings\n`;
            }
          }
          if (product?.modifiers.includes("sugar")) {
            if (prefs.sugar) {
              desc += `- ${prefs.sugar}% Sugar\n`;
            }
          }
          if (product?.modifiers.includes("ice")) {
            if (prefs.ice) {
              desc += `- ${prefs.ice}% Ice\n`;
            }
          }
          generateFields.push({
            name: `${product?.name || `${item.product.id} (Product not found)`} (x${item.quantity})`,
            value: desc,
          });
        }
        const hookBody = {
          content: "Hey <@&1202201263677390888>, New order!",
          embeds: [
            {
              description: `
${order.delivery ? `Deliver to ${order.deliveryAddress}` : `Pickup Order`}
${order.name} ${order.phoneNumber}
Order Total: \`$${order.total / 100}\`
Order ID: \`${sessionID}\`
`,
              color: null,
              fields: generateFields,
              author: {
                name: `${order.basket.length} items`,
              },
              footer: {
                text: `Order from ${order.name}`,
              },
              timestamp: new Date().toISOString(),
            },
          ],
          attachments: [],
        };
        console.log(hookBody);
        console.log(JSON.stringify(hookBody));
        if (process.env.DISCORD_HOOK_1)
          await fetch(process.env.DISCORD_HOOK_1!, {
            body: JSON.stringify(hookBody),
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            console.log({ res });
          });

        if (process.env.DISCORD_HOOK_2)
          await fetch(process.env.DISCORD_HOOK_2!, {
            body: JSON.stringify(hookBody),
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
        console.log(order);
        res
          .status(200)
          .json({ sessionID: session.id, sessionURL: session.url });
        // Fulfill the purchase...
        // handleCheckoutSession(session);
        break;
      default:
        // Unexpected event type
        return res.status(400).end();
    }
  }
}