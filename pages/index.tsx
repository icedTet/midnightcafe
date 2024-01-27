import Image from "next/image";
import Starback from "starback";
import { StarBG } from "../components/landing/StarbackBG";
import { BiFoodMenu } from "react-icons/bi";
import { HiGift } from "react-icons/hi";
import { HiOutlineGift } from "react-icons/hi2";

export default function Home() {
  return (
    <>
      <main
        className={`flex min-h-screen flex-col items-center justify-center p-4 relative z-10 gap-6`}
      >
        <div className="flex flex-col gap-4 justify-between h-full grow">
          <div
            className={`flex flex-row gap-4 items-center justify-center p-8`}
          >
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
          <div className={`flex flex-col gap-4 items-center w-full px-4`}>
            <button
              className={`bg-white text-black w-full px-4 pr-6 h-10 rounded-2xl hover:bg-gray-900/40 hover:text-white hover:border border-gray-100 transition-all duration-150`}
            >
              <div className="flex flex-row gap-2 items-center justify-center ">
                <BiFoodMenu className={`text-lg w-6 h-6`} />
                <span className={` font-bold`}>Order Now</span>
                <span className={`font-light text-xs`}>(Open until 2am)</span>
              </div>
            </button>
            <button
              className={`text-white hover:bg-gray-100/10 w-full h-10 rounded-2xl text-center transition-all duration-200`}
            >
              <div className="flex flex-row gap-2 items-center justify-center ">
                {/* <HiOutlineGift className={`text-lg w-6 h-6`} /> */}
                <span className={``}>View Rewards</span>
              </div>
            </button>
          </div>
        </div>

        <div className={`flex flex-col`}></div>
      </main>
      <div className={`absolute top-0 left-0 w-full h-full opacity-50`}>
        <Image src="/landingbg.jpg" layout="fill" objectFit="cover" alt={""} className={`blur-md opacity-50`} />
        <StarBG aniStage={2} />
      </div>
    </>
  );
}
