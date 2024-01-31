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
        // Fulfill the purchase...
        // handleCheckoutSession(session);
        break;
      default:
        // Unexpected event type
        return res.status(400).end();
    }
  }
}
