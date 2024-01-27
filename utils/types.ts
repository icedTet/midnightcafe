import { ObjectId } from "mongodb";

export type UnverifiedUser = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  ota?: string;
};



export type User = {
    _id: string | ObjectId;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    username?: string;
    points?: number;
}
