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

type Data = {
  user: User;
};
type Error = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | Error>
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

    const MongoPromise = await Mongo;
    const db = MongoPromise.db("Users");
    const collection = db.collection("user");
    const userLocate = (await collection.findOne({
      _id: new ObjectId(userID),
    })) as User;
    if (!userLocate) {
      console.log("userLocate", userLocate, userID);
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(userLocate);
  }
}
