import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <div className={`min-h-screen w-full h-full bg-gray-900 fixed overflow-auto font-wsans`}><Component {...pageProps} /></div>;
}
