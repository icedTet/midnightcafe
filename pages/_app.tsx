import "@/styles/globals.css";
import "nprogress/nprogress.css";
import type { AppProps } from "next/app";
import { UserContextType, UserProvider } from "../utils/useUser";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { fetcher } from "../utils/fetcher";
import { User } from "../utils/types";
import Image from "next/image";
import { StarBG } from "../components/landing/StarbackBG";
import { MotionConfig, AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { Navbar } from "../components/Navbar";
import ProgressBar from "../components/ProgressBar";
import { useWindowSize } from "@uidotdev/usehooks";
import Head from "next/head";
function iOS() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}
export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<UserContextType | null>(null);
  const [initial, setInitial] = useState(true);
  const [nextSlide, setNextSlide] = useState(10000);
  const [cancelAnims, setCancelAnims] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setInitial(false);
    // log innerWidth and innerHeight on mount every 10ms for 2000ms
  }, []);
  useEffect(() => {
    setNextSlide((n) => n - 1);
    const interval = setInterval(() => {
      // console.log(window.innerWidth, window.innerHeight);
    }, 10);
    setTimeout(() => {
      clearInterval(interval);
    }, 2000);
    let slide1Px = window.innerWidth * window.innerHeight;
    const checkingInt = setInterval(() => {
      // if current size is smaller than 1px, then we are on mobile
      if (window.innerWidth * window.innerHeight !== slide1Px) {
        setCancelAnims(true);
      }
    }, 10);
    setTimeout(() => {
      clearInterval(checkingInt);
    }, 200);
  }, [router.pathname]);
  useLayoutEffect(() => {
    const user = localStorage.getItem("user");
    const updateUser = (user: User | null, cached?: boolean) => {
      localStorage.setItem("user", JSON.stringify(user));
      setUser({
        user,
        setUser: updateUser,
        cached: !!cached,
        refreshUser: () => {
          fetcher("/api/users/@me").then(async (res) => {
            if (res.ok) {
              const user = await res.json();
              updateUser(user);
            }
          });
        },
      });
    };
    updateUser(null, true);
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
  const { width, height } = useWindowSize();
  const [forceHeight, setForceHeight] = useState(0);
  const [forceOffset, setforceOffset] = useState(0);
  const anisize = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (anisize.current) {
      if (iOS() && !localStorage.getItem("ios")) {
        localStorage.setItem("ios", "true");
        window.addEventListener("load", () => {
          setTimeout(() => {
            setForceHeight(anisize.current?.clientHeight!);
            setforceOffset(anisize.current?.offsetTop!);
            location.href = "/";
          }, 50);
        });
      } else {
        setForceHeight(anisize.current.clientHeight);
        setforceOffset(anisize.current.offsetTop);
      }
    }
  }, [width, height]);
  useEffect(() => {
    // first IOS load
  }, []);
  return (
    <>
      <Head key="head">
        {/* fix Page has no manifest <link> URL */}
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <UserProvider value={user}>
        <ProgressBar />
        <MotionConfig reducedMotion="user">
          <AnimatePresence>
            <Navbar ref={navbarRef} />
            <motion.div
              key={router.pathname}
              initial={
                initial || cancelAnims
                  ? undefined
                  : { opacity: 0, transform: "translate3d(0, 100vh, 0)" }
              }
              animate={{
                opacity: 1,
                transform: "translate3d(0, 0vh, 0)",
                transition: {
                  duration: 1,
                  type: "spring",
                  bounce: 0.4,
                },
              }}
              exit={
                cancelAnims
                  ? undefined
                  : {
                      opacity: 0,
                      transform: "translate3d(0,-100vh, 0)",
                      // scale: 0.5,
                      transition: {
                        duration: 1,
                        type: "spring",
                        bounce: 0.1,
                      },
                    }
              }
              transition={{ type: "spring", bounce: 0.2 }}
              className={`w-full grow shadow-none flex flex-col overflow-hidden transition-colors will-change-transform ${
                forceOffset > 0 && `absolute`
              }`}
              style={{
                zIndex: nextSlide,
                minHeight: forceHeight,
                top: forceOffset,
              }}
              ref={anisize}
            >
              <div
                className={` w-full grow overflow-auto font-wsans flex flex-col relative`}
              >
                <div
                  className={`w-full h-full absolute top-0 left-0 flex flex-col overflow-auto`}
                >
                  <Component {...pageProps} />
                </div>
              </div>
            </motion.div>
            <div
              className={`fixed top-0 left-0 w-full h-screen opacity-50 z-0`}
            >
              {/* <div className={`bg-gradient-to-b from-gray-900/0 via-gray-900/50 to-gray-900 absolute top-0 left-0`} /> */}
              <Image
                src="/landingbg.jpg"
                layout="fill"
                objectFit="cover"
                alt={""}
                className={`blur-md opacity-50 saturate-50`}
              />
              <StarBG aniStage={2} />
            </div>
          </AnimatePresence>
        </MotionConfig>
      </UserProvider>
    </>
  );
}
