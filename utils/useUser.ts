import { createContext } from "react";
import { User } from "./types";

export const UserContext = createContext<UserContextType | null>(null);
export type UserContextType = {
  user: User | null;
  setUser: (user: User | null, cached?: boolean) => void;
  cached: boolean;
};

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
