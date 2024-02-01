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
type Error = {
  error: string;
};
type Data = OrderData[];
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (req.method === "GET") {
    const token = req.headers.authorization;
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
    console.log("adminIDs", adminIDs,userID);
    if (!adminIDs?.length) {
      return res.status(500).json({ error: "No admin IDs" });
    }
    if (!adminIDs?.includes(userID)) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const MongoPromise = await Mongo;
    const db = MongoPromise.db("Users");
    const collection = db.collection("orders");
    const orders = (await collection.find({}).toArray()) as OrderData[];
    orders.map((order) => {
      order._id = order._id.toString();
      return order;
    });
    return res.status(200).json(orders);
  }
}
