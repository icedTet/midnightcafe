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
    const { userID, code } = req.body;
    // const { firstName, lastName, phoneNumber, marketingAllowed } = req.query;
    if (!code || !userID || !ObjectId.isValid(userID)) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const MongoPromise = await Mongo;
    const db = MongoPromise.db("Users");
    const correctCode = await db.collection("otaCode").findOne({
      userID,
      ota: code,
    });
    if (!correctCode) {
      return res.status(400).json({ error: "Invalid code" });
    }
    if (correctCode.expiresAt < new Date()) {
      return res.status(400).json({ error: "Code expired" });
    }

    await db.collection("otaCode").deleteMany({
      userID: userID,
    });

    return res
      .status(200)
      .json({ token: await Encryptions.issueUserToken(userID) });
    // await twi.messages
    //   .create({
    //     body: `「Midnight Cafe」Hey ${userLocate.firstName} ${userLocate.lastName}, ${code} is your verification code, don't share it with anyone!`,
    //     from: process.env.TWILIO_PHONE_NUMBER,
    //     to: phoneNumber,
    //   })
    //   .then((message) => {
    //     console.log(message.sid);
    //     return res.status(200).json({
    //       exists: true,
    //       numberDetail: userLocate.phoneNumber.substring(7, 11),
    //     });
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //     return res.status(500).json({ error: "Internal Server Error" });
    //   });
  }
}
