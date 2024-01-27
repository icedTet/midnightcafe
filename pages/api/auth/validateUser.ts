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
  exists: boolean;
  numberDetail?: string;
  userID?: string;
};
type Error = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (req.method === "POST") {
    const { phoneNumber, username } = req.body;
    // const { firstName, lastName, phoneNumber, marketingAllowed } = req.query;
    if (!phoneNumber) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const MongoPromise = await Mongo;
    const db = MongoPromise.db("Users");
    const collection = db.collection("user");
    const userLocate = (await collection.findOne({
      $or: [{ phoneNumber }],
    })) as User;
    if (!userLocate) {
      return res.status(200).json({ exists: false });
    }
    const accountSid = process.env.TWILIO_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twi = new Twilio(accountSid, authToken);

    let code = crypto.getRandomValues(new Uint32Array(1))[0].toString(10);
    code = code.slice(0, 6);

    await db.collection("otaCode").insertOne({
      userID: userLocate._id,
      ota: code,
      expiresAt: new Date(Date.now() + 1000 * 60 * 30),
    });

    await twi.messages
      .create({
        body: `「Midnight Cafe」Hey ${userLocate.firstName} ${userLocate.lastName}, ${code} is your verification code, don't share it with anyone!`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      })
      .then((message) => {
        console.log(message.sid);
        return res.status(200).json({
          exists: true,
          numberDetail: userLocate.phoneNumber.substring(7, 11),
          userID: userLocate._id.toString(),
        });
      })
      .catch((e) => {
        console.error(e);
        return res.status(500).json({ error: "Internal Server Error" });
      });
  }
}
