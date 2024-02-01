import { ObjectId } from "mongodb";
import { GenericProduct, PreferenceModifiers } from "./Items";

export type UnverifiedUser = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  ota?: string;
  marketingAllowed?: boolean;
};

export type User = {
  _id: string | ObjectId;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  username?: string;
  points?: number;
  marketingAllowed?: boolean;
};

export type OrderData = {
  _id: string | ObjectId;
  sessionID: string;
  phoneNumber: string;
  basket: {
    product: GenericProduct;
    preferences: PreferenceModifiers;
    quantity: number;
  }[];
  total: number;
  subtotal: number;
  name: string;
  delivery: boolean;
  deliveryAddress: string;
  signupForAccount: boolean;
  date: number;
  pointsGained: number;
  status?: string;
};
