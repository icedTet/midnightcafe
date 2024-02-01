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
import Mongo from "../../../utils/clients/Mongo";
import { ObjectId } from "mongodb";
import { Encryptions } from "../../../utils/Encryptions";
import { OrderData, User } from "../../../utils/types";
import { Twilio } from "twilio";
type Error = {
  error: string;
};
type Data = {
  order: OrderData;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (req.method === "POST") {
    const token = req.headers.authorization;
    const orderID = req.body.orderID;
    const status = req.body.status;
    if (!status || !orderID) {
      return res.status(400).json({ error: "Missing fields" });
    }
    // const { firstName, lastName, phoneNumber, marketingAllowed } = req.query;
    if (!token) {
      return res.status(404).json({ error: "Missing token" });
    }
    if (token.includes("Bearer ")) {
    }
    const userID = await Encryptions.decryptUserToken(
      token.replace("Bearer ", "")
    );
    if (!userID) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const adminIDs = process.env.ADMIN_USERIDS?.split(" ");
    console.log("adminIDs", adminIDs, userID);
    if (!adminIDs?.length) {
      return res.status(500).json({ error: "No admin IDs" });
    }
    if (!adminIDs?.includes(userID)) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const MongoPromise = await Mongo;
    const db = MongoPromise.db("Users");
    const collection = db.collection("orders");
    const order = (await collection.findOne({
      _id: new ObjectId(orderID),
    })) as OrderData;
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    await collection.updateOne(
      {
        _id: new ObjectId(orderID),
      },
      {
        $set: {
          status,
        },
      }
    );
    const accountSid = process.env.TWILIO_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twi = new Twilio(accountSid, authToken);
    false &&
      (await twi.messages
        .create({
          body: `「Midnight Cafe」Hey ${order.name}, Your order is now ${status}!`,

          from: process.env.TWILIO_PHONE_NUMBER,
          to: order.phoneNumber,
        })
        .catch((e) => {
          console.error(e);
          return res.status(500).json({ error: "Internal Server Error" });
        }));
    return res.status(200).json({ order });
  }
}
