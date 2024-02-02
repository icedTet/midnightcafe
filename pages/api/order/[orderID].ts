import { NextApiRequest, NextApiResponse } from "next/types";
import Mongo from "../../../utils/clients/Mongo";
import { ObjectId } from "mongodb";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { orderID } = req.query;
    const db = await Mongo;
    const objID = ObjectId.isValid(orderID as string)
      ? new ObjectId(orderID as string)
      : null;
    const orderData = objID
      ? await db.db("Users").collection("orders").findOne({
          _id: objID,
        })
      : await db.db("Users").collection("orders").findOne({
          sessionID: orderID,
        });

    // @ts-ignore
    orderData?._id && (orderData._id = orderData._id.toString());
    return res.status(200).json(orderData);
  }
};
export default handler;
