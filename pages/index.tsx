import Image from "next/image";
import Starback from "starback";
import { StarBG } from "../components/landing/StarbackBG";
import { BiFoodMenu } from "react-icons/bi";
import { HiChevronRight, HiGift } from "react-icons/hi";
import { HiOutlineGift } from "react-icons/hi2";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../utils/useUser";
import { UserProfile } from "../components/UserProfile";
import { useRouter } from "next/router";

export default function Home() {
  const user = useContext(UserContext);
  const router = useRouter();
  return (
    <>
      <main
        className={`flex flex-col items-center justify-center p-4 relative z-10 gap-6 grow `}
      >
        <div className="flex flex-col gap-4 justify-between h-full grow">
          <div className="flex flex-col gap-8 pt-8">
            <div className={`flex flex-row gap-4 items-center justify-center`}>
              <Image
                src="/logo.svg"
                width={72}
                height={72}
                alt={"Logo"}
                className="shrink-0 aspect-square grow-0"
              />
            </div>
            <div className={`flex flex-col gap-16 items-center w-full`}>
              {/* <div
              className={`flex flex-row gap-2 p-1 bg-gray-100/80 rounded-2xl w-fit items-center`}
            >
              <span
                className={`text-gray-100 font-bold text-xl pr p-1 bg-gradient-to-br from-green-300/40 via-blue-500/40 to-purple-600/40 w-8 h-8 text-center rounded-full`}
              >
                🚚
              </span>
              <span className={`text-gray-900/80 font-medium text-xs pr-4`}>
                Free delivery throughout Tooker House!
              </span>
            </div> */}
              <div className={`flex flex-col gap-4 items-center`}>
                <h1 className="text-5xl lg:text-4xl md:text-3xl font-black text-center font-montserrat grow bg-gradient-to-br bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 bg-clip-text leading-loose text-transparent">
                  The Midnight Cafe
                </h1>
                <span className="text-md lg:text-sm md:text-xs font-medium text-center font-wsans grow text-gray-100/40">
                  Your late night drinks, actually open past 8pm.
                </span>
              </div>
            </div>
          </div>
          <div className={`flex flex-col gap-4 items-center w-full px-4 pb-4`}>
            <Link
              href="/menu"
              prefetch={true}
              className={`flex flex-row items-center justify-center bg-white text-black w-full px-4 pr-6 h-10 rounded-2xl hover:bg-gray-900/40 hover:text-white hover:border border-gray-100 transition-all duration-150`}
            >
              <div className="flex flex-row gap-2 items-center justify-center ">
                <BiFoodMenu className={`text-lg w-6 h-6`} />
                <span className={` font-bold`}>Order Now</span>
                <span className={`font-light text-xs`}>(Open until 2am)</span>
              </div>
            </Link>
            <div
              className={`flex flex-row gap-2 w-full items-center justify-center`}
            >
              <div className={`border grow h-0 border-gray-100/5`} />
              <span className={`text-gray-100/30 text-xs`}>or</span>
              <div className={`border grow h-0 border-gray-100/5`} />
            </div>
            {/* <Link href="/onboarding" className={`w-full`}>
              <button
                className={`text-gray-100/60 hover:text-gray-100 hover:bg-gray-100/10 w-full h-10 rounded-2xl text-center transition-all duration-200`}
              >
                <div className="flex flex-row gap-2 items-center justify-center ">
                  <span className={``}>Login / Register</span>
                </div>
              </button>
            </Link> */}
            {user?.user ? (
              <div className={`flex flex-col gap-4 w-full`}>
                {/* {JSON.stringify(self)} */}
                <div className={`flex flex-col gap-4 w-full `}>
                  {/* <span
                  className={`text-sm font-medium font-montserrat text-gray-100/20`}
                >
                  You&apos;re already logged into
                </span> */}
                  <div
                    className={`flex flex-row gap-4 p-4 border rounded-2xl items-center border-gray-100/20 drop-shadow-md shadow-xl bg-gray-850 w-full cursor-pointer hover:bg-gray-800 transition-all`}
                    onClick={() => router.push("/dashboard")}
                  >
                    <UserProfile
                      user={user?.user}
                      className="w-10 h-10 text-xs"
                    />
                    <div className={`flex flex-col gap-0`}>
                      <span className={`text-gray-100/20 text-sm font-medium`}>
                        Signed in as
                      </span>
                      <span
                        className={`text-white text-lg font-bold font-montserrat`}
                      >
                        {user?.user?.firstName} {user?.user?.lastName}
                      </span>

                      {/* <span className={`text-gray-400 text-sm font-wsans`}>
                  {user?.email}
                </span> */}
                    </div>
                    <div className={`flex-grow`}></div>
                    <HiChevronRight className={`w-6 h-6 text-gray-100/20`} />
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/onboarding" className={`w-full`} prefetch={true}>
                <button
                  className={`text-gray-100/60 hover:text-gray-100 hover:bg-gray-100/10 w-full h-10 rounded-2xl text-center transition-all duration-200`}
                >
                  <div className="flex flex-row gap-2 items-center justify-center ">
                    <span className={``}>Login / Register</span>
                  </div>
                </button>
              </Link>
            )}
          </div>
        </div>

        <div className={`flex flex-col`}>
          <div className={`flex flex-row gap-2 items-center justify-center`}>
            {/* <span className={`text-white text-xs font-light`}>Made by Tet</span> */}
          </div>
        </div>
      </main>
    </>
  );
}
