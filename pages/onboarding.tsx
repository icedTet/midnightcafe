import Image from "next/image";
import { useEffect, useState } from "react";
import { StarBG } from "../components/landing/StarbackBG";
import { motion } from "framer-motion";

export const OnboardingPage = () => {
  const [stage, setStage] = useState(0);
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("1");
  const [allowedMarketing, setallowedMarketing] = useState(true);
  const [phone, setPhone] = useState("");
  const [code, setcode] = useState("");
  const [loading, setloading] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const [exists, setExists] = useState(false);
  const [existingUserID, setexistingUserID] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setStage(1);
      globalThis?.document?.getElementById("nameInput")?.focus();
    }, 250);
  }, []);
  useEffect(() => {
    seterrorMsg("");
  }, [name, phone, countryCode, allowedMarketing, code]);
  return (
    <>
      <main
        className={`flex min-h-screen flex-col items-center justify-center p-4 relative z-10 gap-6`}
      >
        <div className="flex flex-col gap-4 justify-between items-center h-full grow">
          <div
            className={`flex flex-row gap-4 items-center justify-center p-8 pb-0`}
          >
            <Image
              src="/logo.svg"
              width={72}
              height={72}
              alt={"Logo"}
              className="shrink-0 aspect-square grow-0"
            />
          </div>
          <div
            className={`flex flex-col gap-4 items-center w-full grow justify-between`}
          >
            <span className="text-3xl lg:text-2xl md:text-2xl font-extrabold text-center font-montserrat bg-gradient-to-br  from-indigo-200 via-red-200 to-yellow-100 bg-clip-text leading-loose text-transparent">
              Register / Login
            </span>
            <div className={`relative gap-0 h-36`}>
              <motion.div
                className={`w-full max-w-[45ch] px-4 gap-6 flex flex-col ${
                  stage === 1 ? "pointer-events-auto" : "pointer-events-none"
                }`}
                initial="hidden"
                animate={stage === 1 ? "visible" : "hidden"}
                variants={{
                  hidden: {
                    opacity: 0,
                    //   x: -100,
                    height: 0,
                    transition: {
                      duration: 0.5,
                      delay: 0.5,
                      when: "afterChildren",
                      staggerChildren: 0.1,
                    },
                  },
                  visible: {
                    opacity: 1,
                    //   x: 0,
                    transition: {
                      duration: 0,
                      delay: 0.2,
                      when: "beforeChildren",
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                <motion.h3
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: -100,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 1,
                        type: "spring",
                        bounce: 0.5,
                      },
                    },
                  }}
                  className={`text-xl font-bold font-montserrat text-gray-100/80`}
                >
                  What&apos;s your Phone Number?
                </motion.h3>
                <motion.div
                  className={`flex flex-row gap-4 items-center w-full`}
                >
                  <motion.span
                    className={`text-gray-100/40 font-bold text-xl text-center`}
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: -100,
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 1,
                          type: "spring",
                          bounce: 0.5,
                        },
                      },
                    }}
                  >
                    +
                  </motion.span>
                  <motion.input
                    //   variants={animateItem}
                    variants={{
                      hidden: {
                        opacity: 0,
                        // y: -100,
                      },
                      visible: {
                        opacity: 1,
                        // y: 0,
                        transition: {
                          duration: 1,
                          type: "spring",
                          bounce: 0.5,
                        },
                      },
                    }}
                    type="text"
                    className={`bg-gray-800/30 text-gray-100/80 p-3 py-3 w-16 rounded-2xl text-xl font-medium font-wsans focus:outline-none focus:ring-purple-500 ring-2 transition-all ring-transparent placeholder:text-2xl placeholder:font-medium placeholder:text-gray-100/40 placeholder:align-middle`}
                    placeholder={"1"}
                    onChange={(e) => {
                      setCountryCode(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === "Return") {
                        globalThis.window?.document
                          ?.getElementById("nextbutton")
                          ?.click();
                        //   localStorage.setItem("name", name);
                        //   router.push("/");
                      }
                    }}
                    value={countryCode}
                    autoFocus
                  />
                  <motion.input
                    //   variants={animateItem}
                    variants={{
                      hidden: {
                        opacity: 0,
                        // y: -100,
                      },
                      visible: {
                        opacity: 1,
                        // y: 0,
                        transition: {
                          duration: 1,
                          type: "spring",
                          bounce: 0.5,
                        },
                      },
                    }}
                    type="number"
                    className={`bg-gray-800/30 text-gray-100/80 px-6 py-3 rounded-2xl w-full text-xl font-medium font-wsans focus:outline-none focus:ring-purple-500 ring-2 transition-all ring-transparent placeholder:text-2xl placeholder:font-medium placeholder:text-gray-100/40 placeholder:align-middle max-w-[45ch]`}
                    placeholder={"123-456-7890"}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/[^0-9]/g, ""));
                    }}
                    id="phoneinput"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === "Return") {
                        globalThis.window?.document
                          ?.getElementById("nextbutton")
                          ?.click();
                        //   localStorage.setItem("name", name);
                        //   router.push("/");
                      }
                    }}
                    value={phone}
                    autoFocus
                  />
                </motion.div>
                <motion.span
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: -100,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 1,
                        type: "spring",
                        bounce: 0.5,
                      },
                    },
                  }}
                  className={`text-xs font-medium font-wsans text-gray-100/30`}
                >
                  We&apos;ll send you a text to verify your number. Don&apos;t
                  worry, we won&apos;t sell your number to anyone.
                </motion.span>
              </motion.div>
              <motion.div
                className={`w-full max-w-[45ch] px-4 gap-6 flex flex-col ${
                  stage === 3 ? "pointer-events-auto" : "pointer-events-none"
                }`}
                initial="hidden"
                animate={stage === 3 ? "visible" : "hidden"}
                variants={{
                  hidden: {
                    opacity: 0,
                    //   x: -100,
                    height: 0,
                    transition: {
                      duration: 0.5,
                      delay: 0.5,
                      when: "afterChildren",
                      staggerChildren: 0.1,
                    },
                  },
                  visible: {
                    opacity: 1,
                    //   x: 0,
                    transition: {
                      duration: 0,
                      delay: 0.2,
                      when: "beforeChildren",
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                <motion.h3
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: -100,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 1,
                        type: "spring",
                        bounce: 0.5,
                      },
                    },
                  }}
                  className={`text-xl font-bold font-montserrat text-gray-100/80`}
                >
                  Please enter the code we sent you
                </motion.h3>
                <motion.input
                  //   variants={animateItem}
                  variants={{
                    hidden: {
                      opacity: 0,
                      // y: -100,
                    },
                    visible: {
                      opacity: 1,
                      // y: 0,
                      transition: {
                        duration: 1,
                        type: "spring",
                        bounce: 0.5,
                      },
                    },
                  }}
                  type="number"
                  className={`bg-gray-800/30 text-gray-100/80 px-6 py-3 rounded-2xl w-1/2 text-xl font-medium font-wsans focus:outline-none focus:ring-purple-500 ring-2 transition-all ring-transparent placeholder:text-2xl placeholder:font-medium placeholder:text-gray-100/40 placeholder:align-middle max-w-[45ch]`}
                  placeholder={"000000"}
                  onChange={(e) => {
                    setcode(e.target.value.replace(/[^0-9]/g, ""));
                  }}
                  id="codeInput"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === "Return") {
                      globalThis.window?.document
                        ?.getElementById("nextbutton")
                        ?.click();
                      //   localStorage.setItem("name", name);
                      //   router.push("/");
                    }
                  }}
                  value={code}
                  autoFocus
                />
                <motion.span
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: -100,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 1,
                        type: "spring",
                        bounce: 0.5,
                      },
                    },
                  }}
                  className={`text-sm font-medium font-wsans text-gray-100/30`}
                >
                  Check your phone for a text message from us. Enter the code we
                  sent you above.
                </motion.span>
              </motion.div>
              <motion.div
                className={`w-full max-w-[45ch] px-4 gap-6 flex flex-col
                    ${
                      stage === 2
                        ? "pointer-events-auto"
                        : "pointer-events-none"
                    }
                `}
                initial="hidden"
                animate={stage === 2 ? "visible" : "hidden"}
                variants={{
                  hidden: {
                    opacity: 0,
                    //   x: -100,
                    height: 0,
                    transition: {
                      duration: 0.5,
                      delay: 0.5,
                      when: "afterChildren",
                      staggerChildren: 0.1,
                    },
                  },
                  visible: {
                    opacity: 1,
                    //   x: 0,
                    transition: {
                      duration: 0,
                      delay: 0.2,
                      when: "beforeChildren",
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                <motion.h3
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: -100,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 1,
                        type: "spring",
                        bounce: 0.5,
                      },
                    },
                  }}
                  className={`text-xl font-bold font-montserrat text-gray-100/80`}
                >
                  What&apos;s your name?
                </motion.h3>

                <motion.input
                  //   variants={animateItem}
                  variants={{
                    hidden: {
                      opacity: 0,
                      // y: -100,
                    },
                    visible: {
                      opacity: 1,
                      // y: 0,
                      transition: {
                        duration: 1,
                        type: "spring",
                        bounce: 0.5,
                      },
                    },
                  }}
                  type="text"
                  id="nameInput"
                  className={`bg-gray-800/30 text-gray-100/80 px-6 py-3 rounded-2xl w-full text-xl font-medium font-wsans focus:outline-none focus:ring-purple-500 ring-2 transition-all ring-transparent placeholder:text-2xl placeholder:font-medium placeholder:text-gray-100/40 placeholder:align-middle max-w-[45ch]`}
                  placeholder={"Your Name"}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === "Return") {
                      globalThis.window?.document
                        ?.getElementById("nextbutton")
                        ?.click();
                      //   localStorage.setItem("name", name);
                      //   router.push("/");
                    }
                  }}
                  value={name}
                  autoFocus
                />
                <motion.span
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: -100,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 1,
                        type: "spring",
                        bounce: 0.5,
                      },
                    },
                  }}
                  className={`text-xs font-medium font-wsans text-gray-100/30`}
                >
                  Your number will only be used for verification, order updates,
                  and occasional offers if you have opted in.
                </motion.span>
                <motion.div
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: -100,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 1,
                        type: "spring",
                        bounce: 0.5,
                      },
                    },
                  }}
                  className={`flex items-center mb-4`}
                >
                  <input
                    id="optin"
                    type="checkbox"
                    checked={allowedMarketing}
                    onChange={(e) => {
                      setallowedMarketing(e.target.checked);
                    }}
                    className="w-4 h-4 text-purple-500 accent-purple-500 rounded-lg focus:ring-purple-500  focus:ring-2 bg-gray-700 border-gray-600"
                  />
                  <label
                    htmlFor="optin"
                    className="ms-2 text-xs font-medium text-gray-100/20"
                  >
                    Opt-in to occasional offers and updates from us! You can opt
                    out at any time by replying &quot;STOP&quot;.
                  </label>
                </motion.div>
                <motion.span
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: -100,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 1,
                        type: "spring",
                        bounce: 0.5,
                      },
                    },
                  }}
                  className={`text-xs font-medium font-wsans text-gray-100/30`}
                >
                  Carrier rates may apply.
                </motion.span>
              </motion.div>
            </div>
            <div
              className={`flex flex-col gap-4 items-center w-full px-4 pb-16`}
            >
              <button
                className={`bg-white text-black w-full px-4 pr-6 h-10 rounded-2xl hover:bg-gray-900/40 hover:text-white hover:border border-gray-100 transition-all duration-150 disabled:opacity-10`}
                id="nextbutton"
                onClick={async () => {
                  setloading(true);
                  if (stage === 1) {
                    if (phone.length < 10) {
                      seterrorMsg("Please enter a valid phone number");
                      setloading(false);
                      return;
                    }
                    const res = await fetch("/api/auth/validateUser", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        phoneNumber: `+${countryCode}${phone}`,
                      }),
                    });
                    if (res.ok) {
                      const { exists, numberDetail, userID } = await res.json();
                      if (exists) {
                        setExists(true);
                        setexistingUserID(userID);
                        setStage(3);
                      } else {
                        setStage(2);
                      }
                      setloading(false);
                    } else {
                      seterrorMsg(
                        `Something went wrong. ${(await res.json()).error}`
                      );
                    }
                  }
                  if (stage === 2) {
                    if (name.length < 3) {
                      seterrorMsg("Please enter a valid name");
                      setloading(false);
                      return;
                    }
                    // globalThis.document?.getElementById("phoneinput")?.focus();
                    const res = await fetch("/api/auth/createVerifyRequest", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        phoneNumber: `+${countryCode}${phone}`,
                        lastName: name.split(" ").pop(),
                        firstName: name.split(" ").slice(0, -1).join(" "),
                        allowedMarketing,
                      }),
                    });
                    if (res.ok) {
                      setStage(3);
                      setloading(false);
                      globalThis.document?.getElementById("codeInput")?.focus();
                    } else {
                      seterrorMsg(
                        `Something went wrong. ${(await res.json()).error}`
                      );
                    }
                    setStage(3);
                    setloading(false);
                  }
                  if (stage === 3) {
                    if (code.length < 6) {
                      seterrorMsg("Please enter a valid code");
                      setloading(false);
                      return;
                    }
                    const res = await fetch(
                      exists
                        ? "/api/auth/grantToken"
                        : "/api/auth/verifyRequest",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          phoneNumber: `+${countryCode}${phone}`,
                          code,
                          allowedMarketing,
                          ...(exists && { userID: existingUserID }),
                        }),
                      }
                    );
                    if (res.ok) {
                      const { token } = await res.json();
                      localStorage.setItem("token", token);
                      globalThis.location?.reload();
                    } else {
                      seterrorMsg(
                        `Something went wrong. ${(await res.json()).error}`
                      );
                    }
                  }
                  //   if (stage === 2) {
                  //     // verify phone
                  //     if (name.length < 10) {
                  //       seterrorMsg("Please enter a valid name");
                  //       setloading(false);
                  //       return;
                  //     }

                  //     // send code

                  //   }
                }}
                disabled={loading || !!errorMsg.length}
              >
                <div className="flex flex-row gap-2 items-center justify-center ">
                  {/* <BiFoodMenu className={`text-lg w-6 h-6`} /> */}
                  <span className={` font-bold`}>
                    {loading ? "Loading..." : stage === 3 ? "Verify" : "Next"}
                  </span>
                  <span className={`font-light text-xs`}></span>
                </div>
              </button>
              <span
                className={`text-red-900     text-xs font-medium font-wsans text-left w-full`}
              >
                {errorMsg}
              </span>
            </div>
          </div>
        </div>

        <div className={`flex flex-col`}>
          <div className={`flex flex-row gap-2 items-center justify-center`}>
            {/* <span className={`text-white text-xs font-light`}>Made by Tet</span> */}
          </div>
        </div>
      </main>
      <div className={`fixed top-0 left-0 w-full h-full opacity-50`}>
        {/* <div className={`bg-gradient-to-b from-gray-900/0 via-gray-900/50 to-gray-900 absolute top-0 left-0`} /> */}
        <Image
          src="/landingbg.jpg"
          layout="fill"
          objectFit="cover"
          alt={""}
          className={`blur-md opacity-50`}
        />
        <StarBG aniStage={2} />
      </div>
    </>
  );
};
// const
export default OnboardingPage;
