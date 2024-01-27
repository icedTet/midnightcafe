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

type Data = {
  token: string;
};
type Error = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (req.method === "POST") {
    const { phoneNumber, code, allowedMarketing } = req.body;
    // const { firstName, lastName, phoneNumber, marketingAllowed } = req.query;
    if (!code || !phoneNumber) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const MongoPromise = await Mongo;
    const db = MongoPromise.db("Users");
    const collection = db.collection("unverifiedUser");
    const attempt = await collection.findOne({
      phoneNumber,
      ota: code,
    });
    if (!attempt) {
      return res.status(400).json({ error: "Invalid code" });
    }
    const userID = new ObjectId();
    if (await db.collection("users").findOne({ phoneNumber })) {
      await db.collection("unverifiedUser").deleteMany({
        phoneNumber,
      });
      return res.status(400).json({ error: "User already exists" });
    }
    await db.collection("user").insertOne({
      _id: userID,
      firstName: attempt.firstName,
      lastName: attempt.lastName,
      phoneNumber: attempt.phoneNumber,
      marketingAllowed: allowedMarketing,
      points: 0,
    });
    await db.collection("unverifiedUser").deleteMany({
      phoneNumber,
    });

    return res
      .status(200)
      .json({ token: await Encryptions.issueUserToken(userID) });
  }
}
