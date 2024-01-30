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

type Data = {
  success: boolean;
};
type Error = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (req.method === "POST") {
    const { firstName, lastName, phoneNumber } = req.body;
    // const { firstName, lastName, phoneNumber, marketingAllowed } = req.query;
    // console.log("firstName", firstName);
    // console.log("lastName", lastName);
    // console.log("phoneNumber", phoneNumber);
    if (!firstName || !lastName || !phoneNumber) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const accountSid = process.env.TWILIO_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twi = new Twilio(accountSid, authToken);
    let code = crypto.getRandomValues(new Uint32Array(1))[0].toString(10);
    code = code.slice(0, 6);
    const MongoPromise = await Mongo;
    const db = MongoPromise.db("Users");
    const collection = db.collection("unverifiedUser");
    await collection.insertOne({
      firstName,
      lastName,
      phoneNumber,
      ota: code,
    });

    await twi.messages
      .create({
        body: `「Midnight Cafe」Hey ${firstName} ${lastName}, ${code} is your verification code, don't share it with anyone!`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      })
      .then((message) => {
        console.log(message.sid);
        return res.status(200).json({ success: true });
      })
      .catch((e) => {
        console.error(e);
        return res.status(500).json({ error: "Internal Server Error" });
      });
  }
}
