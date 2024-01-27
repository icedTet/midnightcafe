import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserContextType, UserProvider } from "../utils/useUser";
import { useLayoutEffect, useState } from "react";
import { fetcher } from "../utils/fetcher";
import { User } from "../utils/types";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<UserContextType | null>(null);
  useLayoutEffect(() => {
    const user = localStorage.getItem("user");
    const updateUser = (user: User | null, cached?: boolean) => {
      localStorage.setItem("user", JSON.stringify(user));
      setUser({ user, setUser: updateUser, cached: !!cached });
    };

    if (user) {
      updateUser(JSON.parse(user), true);
    }
    fetcher("/api/users/@me").then(async (res) => {
      if (res.ok) {
        const user = await res.json();
        updateUser(user);
      }
    });
  }, []);
  return (
    <UserProvider value={user}>
      <div
        className={`min-h-screen w-full h-full bg-gray-900 overflow-auto font-wsans`}
      >
        <Component {...pageProps} />
      </div>
    </UserProvider>
  );
}
