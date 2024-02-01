import { BiFoodMenu } from "react-icons/bi";
import { MenuItem } from "../components/menu/MenuItem";
import { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Modal } from "../components/Modal";
import { ShoppingCartItem } from "../utils/ShoppingCart";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Head from "next/head";
import {
  BobaProduct,
  CupsizeModiferNames,
  FoodProduct,
  GenericProduct,
  PreferenceModifiers,
  ToppingModiferNames,
  calculateItemPrice,
  cupsizePrices,
  products,
  toppingPrices,
} from "../utils/Items";
import { fetcher } from "../utils/fetcher";
import { useRouter } from "next/router";
import { UserContext } from "../utils/useUser";
import SelectMenu from "../components/SelectMenu";

export const MenuPage = (props: {
  products: (BobaProduct | FoodProduct)[];
}) => {
  const { products } = props;
  const [selectedItem, setSelectedItem] = useState("");
  const [shoppingCart, setShoppingCart] = useState([] as ShoppingCartItem[]);
  const [shoppingCartOpened, setShoppingCartOpened] = useState(false);
  const [creatingSession, setCreatingSession] = useState(false);
  const [showShoppingDetails, setShowShoppingDetails] = useState(false);
  const [orderName, setOrderName] = useState("");
  const [orderPhone, setOrderPhone] = useState("");
  const [orderPhoneCountryCode, setOrderPhoneCountryCode] = useState("1");
  const [getPoints, setGetPoints] = useState(true);
  const [allowPhoneContact, setAllowPhoneContact] = useState(true);
  const [delivery, setDelivery] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState("tooker");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const router = useRouter();
  const user = useContext(UserContext);
  useEffect(() => {
    if (!shoppingCart.length) {
      const cart = localStorage.getItem("shoppingCart");
      if (cart && JSON.stringify(cart) !== JSON.stringify(shoppingCart)) {
        setShoppingCart(JSON.parse(cart));
      }
    }
    if (shoppingCart.length) {
      localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    }
  }, [shoppingCart]);
  useEffect(() => {
    if (localStorage.getItem("delivery")) setDelivery(true);
    if (localStorage.getItem("deliveryAddress"))
      setDeliveryAddress(localStorage.getItem("deliveryAddress")!);
    if (localStorage.getItem("deliveryLocation"))
      setDeliveryLocation(localStorage.getItem("deliveryLocation")!);
    if (localStorage.getItem("orderName"))
      setOrderName(localStorage.getItem("orderName")!);
    if (localStorage.getItem("orderPhone"))
      setOrderPhone(localStorage.getItem("orderPhone")!);
  }, []);
  useEffect(() => {
    localStorage.setItem("orderName", `${orderName}`);
  }, [orderName]);
  useEffect(() => {
    localStorage.setItem("orderPhone", `${orderPhone}`);
  }, [orderPhone]);
  const addItemToCart = (
    product: GenericProduct,
    preferences: PreferenceModifiers,
    quantity?: number
  ) => {
    console.trace("cll");
    const item = {
      product,
      preferences,
      quantity: quantity || 1,
    } as ShoppingCartItem;
    let newCart = [...shoppingCart];
    const find = shoppingCart.find(
      (item) =>
        item.product.id === product.id &&
        JSON.stringify(item.preferences) === JSON.stringify(preferences)
    );
    if (!find) {
      newCart = [...shoppingCart, item];
    } else {
      console.log("Found", find, "old cart", find.quantity);
      find.quantity += quantity || 1;
      console.log("New cart", find.quantity);
    }
    console.log("Item", item, "Cart", shoppingCart);
    setShoppingCart(newCart);
    setShoppingCartOpened(true);
  };
  const removeItemFromCart = (
    shoppingCartItem: ShoppingCartItem,
    quantity: number
  ) => {
    let newCart = [...shoppingCart];
    const index = newCart.findIndex(
      (item) =>
        item.product.id === shoppingCartItem.product.id &&
        JSON.stringify(item.preferences) ===
          JSON.stringify(shoppingCartItem.preferences)
    );
    if (index === -1) {
      return;
    } else {
      newCart[index].quantity -= quantity;
      if (newCart[index].quantity <= 0) {
        newCart.splice(index, 1);
      }
    }
    setShoppingCart(newCart);
  };

  return (
    <>
      <Head>
        <title>Midnight Cafe - Menu</title>
        <meta
          name="description"
          content="The Midnight Cafe - Open late, past 8pm."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div
        initial="hidden"
        animate="visible"
        className={`flex flex-col gap-8 items-center w-full max-w-4xl md:max-w-80 lg:max-w-xl py-16 relative z-0 mx-auto`}
        variants={{
          hidden: {
            opacity: 0,
            //   x: -100,
            transition: {
              duration: 0,
              delay: 0,
              // when: "afterChildren",
              staggerChildren: 1,
            },
          },
          visible: {
            opacity: 1,
            //   x: 0,
            transition: {
              duration: 0,
              delay: 0.1,
              when: "beforeChildren",
              staggerChildren: 0.5,
            },
          },
        }}
      >
        <motion.div
          className={`flex flex-col gap-0 items-center w-full`}
          variants={{
            hidden: {
              opacity: 0,
              //   x: -100,
              transition: {
                duration: 0,
                delay: 0,
                // when: "afterChildren",
                staggerChildren: 0,
              },
            },
            visible: {
              opacity: 1,
              //   x: 0,
              transition: {
                duration: 0,
                delay: 0.1,
                when: "beforeChildren",
                staggerChildren: 0.3,
              },
            },
          }}
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, transform: "translate3d(0, 100vh, 0)" },
              visible: {
                opacity: 1,
                transform: "translate3d(0, 0vh, 0)",
                transition: {
                  duration: 1,
                  type: "spring",
                  bounce: 0.4,
                },
              },
            }}
            className="text-5xl lg:text-4xl md:text-3xl font-black w-full font-montserrat grow bg-gradient-to-br from-indigo-200 via-red-200 to-yellow-100 bg-clip-text leading-relaxed text-transparent"
          >
            Menu
          </motion.h1>
          <motion.span
            variants={{
              hidden: { opacity: 0, transform: "translate3d(0, 100vh, 0)" },
              visible: {
                opacity: 1,
                transform: "translate3d(0, 0vh, 0)",
                transition: {
                  duration: 1,
                  type: "spring",
                  bounce: 0.4,
                },
              },
            }}
            className="text-md lg:text-sm md:text-xs font-medium w-full font-wsans grow text-gray-100/40"
          >
            Stuff you can stuff in your mouth i suppose.
          </motion.span>
          {!(new Date().getHours() >= 20 || new Date().getHours() < 2) && (
            <motion.span
              variants={{
                hidden: { opacity: 0, transform: "translate3d(0, 100vh, 0)" },
                visible: {
                  opacity: 1,
                  transform: "translate3d(0, 0vh, 0)",
                  transition: {
                    duration: 1,
                    type: "spring",
                    bounce: 0.4,
                  },
                },
              }}
              className={`flex flex-row gap-2 w-full items-center justify-center pt-8 font-bold`}
            >
              We're closed right now, but we will automatically start making
              your order at 8pm!
            </motion.span>
          )}
        </motion.div>
        <motion.div
          className={` w-full grid grid-cols-3 lg:grid-cols-2 md:grid-cols-1 md: gap-8`}
          variants={{
            hidden: {
              opacity: 0,
              //   x: -100,
              transition: {
                duration: 0,
                delay: 0,
                // when: "afterChildren",
                staggerChildren: 1,
              },
            },
            visible: {
              opacity: 1,
              //   x: 0,
              transition: {
                duration: 0,
                delay: 0.1,
                when: "beforeChildren",
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {products.map((product) => (
            <MenuItem
              product={product}
              key={product.id}
              onClick={() => {
                setSelectedItem(product.id);
              }}
              selected={selectedItem === product.id}
              setSelectedItem={setSelectedItem}
              orderItem={(product, prefs) => {
                addItemToCart(product, prefs);
              }}
            />
          ))}
        </motion.div>
        {/* <div className={`min-h-[30rem] w-] md:flex hidden relative`}>
      <div
        className={`absolute top-0 left-0 w-full h-full flex flex-row gap-8 overflow-auto`}
      >
        {products.map((product) => (
          <MenuItem product={product} key={product.id} />
        ))}
      </div>
    </div> */}
      </motion.div>
      <Modal
        visible={shoppingCartOpened && !showShoppingDetails}
        onClose={() => {
          setShoppingCartOpened(false);
        }}
        className={`w-[85%] max-w-2xl md:w-full h-5/6 flex flex-col md:flex-col gap-4 md:items-center p-8 overflow-auto justify-between`}
      >
        <h3 className={`text-3xl font-bold font-montserrat`}>Your Order</h3>
        <div className={` w-full grow relative`}>
          <div
            className={`flex flex-col gap-2 md:gap-4 w-full h-full absolute top-0 left-0 overflow-auto`}
          >
            {shoppingCart.map((item) => {
              const { product, quantity, preferences } = item;
              return (
                <div
                  className={`flex flex-row md:flex-col gap-8 md:bg-gray-900/50 md:p-4 rounded-xl`}
                  key={`shopping-cart-item-${JSON.stringify(item)}`}
                >
                  <img
                    src={product.image}
                    className={`w-20 h-20 md:hidden object-cover rounded-2xl shrink-0`}
                  />
                  <div className={`flex flex-col gap-4 items-start w-full`}>
                    <div className={`flex flex-row gap-4 items-center w-full`}>
                      <img
                        src={product.image}
                        className={`w-12 h-12 md:block hidden object-cover rounded-2xl shrink-0`}
                      />
                      <h3
                        className={`font-montserrat font-bold text-lg w-full`}
                      >
                        {product.name}
                      </h3>
                    </div>
                    <span className={`text-sm font-medium text-gray-100/40`}>
                      {product.description}
                    </span>
                    <div
                      className={`flex flex-col gap-0 text-gray-100/60 font-wsans font-medium text-sm`}
                    >
                      {typeof preferences.ice !== "undefined" && (
                        <div className={`flex flex-row gap-2 items-center `}>
                          - {preferences.ice}% Ice
                        </div>
                      )}
                      {typeof preferences.sugar !== "undefined" && (
                        <div className={`flex flex-row gap-2 items-center `}>
                          - {preferences.sugar}% Sweet
                        </div>
                      )}
                      {preferences.cupsize && (
                        <div className={`flex flex-row gap-2 items-center `}>
                          - {CupsizeModiferNames[preferences.cupsize]}{" "}
                          {!!cupsizePrices[preferences.cupsize] &&
                            `($${cupsizePrices[preferences.cupsize]})`}
                        </div>
                      )}
                      {!!preferences.toppings?.length && (
                        <div className={`flex flex-row gap-2 items-center `}>
                          -{" "}
                          {preferences.toppings
                            .map((topping) => ToppingModiferNames[topping])
                            .join(", ")}{" "}
                          {!preferences.toppings.reduce(
                            (acc, curr) => acc + toppingPrices[curr],
                            0
                          ) &&
                            `($${preferences.toppings
                              .reduce(
                                (acc, curr) => acc + toppingPrices[curr],
                                0
                              )
                              .toFixed(2)}
                      )`}
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className={`flex flex-col md:flex-row md:justify-between md:items-center gap-4 items-end`}
                  >
                    <span
                      className={`font-wsans font-medium text-base text-gray-100/40`}
                    >
                      $
                      {(
                        calculateItemPrice(product, preferences) * quantity
                      ).toFixed(2)}
                    </span>
                    <div className={`flex flex-row gap-2 items-center`}>
                      <button
                        className={`w-8 h-8 bg-gray-100/10 rounded-full flex items-center justify-center`}
                        onClick={() => {
                          removeItemFromCart(item, 1);
                        }}
                      >
                        <span className={`text-gray-100/60`}>-</span>
                      </button>
                      <span className={`font-mono font-medium text-base`}>
                        {" ".padStart(3 - `${quantity}`.length, " ")}
                        {quantity}
                      </span>
                      <button
                        className={`w-8 h-8 bg-gray-100/10 rounded-full flex items-center justify-center`}
                        onClick={() => {
                          addItemToCart(product, preferences);
                        }}
                      >
                        <span className={`text-gray-100/60`}>+</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* <div className={`flex flex-col gap-6`}></div> */}
        <button
          className={`bg-black shrink-0 text-white w-full px-4 h-12 rounded-2xl group hover:bg-white hover:text-black transition-all duration-150 relative disabled:opacity-50 disabled:cursor-not-allowed`}
          onClick={async () => {
            setSelectedItem?.("");

            if (!user?.user) return setShowShoppingDetails(true);
            setCreatingSession(true);
            await fetcher("/api/stripe/createCheckoutSession", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                basket: shoppingCart.map((item) => ({
                  product: item.product,
                  preferences: item.preferences,
                  quantity: item.quantity,
                })),
                delivery,
                deliveryAddress: `${deliveryLocation} ${deliveryAddress}`,
              }),
            }).then(async (resp) => {
              if (resp.ok) {
                const res = await resp.json();
                router.push(res.sessionURL);
              }
              setCreatingSession(false);
            });
            localStorage.setItem("delivery", `${delivery}`);
            localStorage.setItem("deliveryAddress", `${deliveryAddress}`);
            localStorage.setItem("deliveryLocation", `${deliveryLocation}`);
          }}
          disabled={
            creatingSession ||
            !shoppingCart.length ||
            (delivery && (!deliveryAddress || !deliveryLocation))
          }
        >
          <div className="flex flex-row gap-2 items-center justify-center relative z-10 text-sm">
            {/* <Star className={`text-lg w-6 h-6`} /> */}
            <span className={`font-bold`}>
              {user?.user ? `Place Order` : `Checkout`} ($
              {shoppingCart
                .reduce(
                  (acc, curr) =>
                    acc +
                    calculateItemPrice(curr.product, curr.preferences) *
                      curr.quantity,
                  0 + (delivery ? 1 : 0)
                )
                .toFixed(2)}
              )
            </span>
          </div>
        </button>
        <div className={`flex items-center mb-4`}>
          <input
            id="optin"
            type="checkbox"
            checked={delivery}
            onChange={(e) => {
              setDelivery(e.target.checked);
            }}
            className="w-4 h-4 text-purple-500 accent-purple-500 rounded-lg focus:ring-purple-500  focus:ring-2 bg-gray-700 border-gray-600"
          />
          <label
            htmlFor="optin"
            className="ms-2 text-xs font-medium text-gray-100/40"
          >
            Deliver it to me! (+$1)
          </label>
        </div>
        {delivery && (
          <div className={`flex flex-col gap-2`}>
            <SelectMenu
              selectItems={[
                {
                  id: "tooker",
                  name: "Tooker House",
                },
              ]}
              selectedItemId={deliveryLocation}
              onSelect={(item) => {
                setDeliveryLocation(item.id);
              }}
            />
            <input
              type="text"
              id="address"
              className={`bg-gray-700/30 text-gray-100/80 px-6 py-3 rounded-2xl w-full text-base font-medium font-wsans focus:outline-none focus:ring-purple-500 ring-2 transition-all ring-transparent placeholder:text-xs placeholder:font-medium placeholder:text-gray-100/40 placeholder:align-middle`}
              placeholder={"Room (e.g. A101, B202, etc)"}
              onChange={(e) => {
                setDeliveryAddress(e.target.value);
              }}
              value={deliveryAddress}
            />
          </div>
        )}
      </Modal>
      <Modal
        visible={showShoppingDetails}
        onClose={() => {
          setShowShoppingDetails(false);
        }}
        className={` w-[85%] max-w-2xl md:w-full max-h-5/6 flex md:flex-col gap-4 md:items-center p-8 overflow-auto justify-between mx-auto`}
        zIndex={20000}
      >
        <div className={`flex flex-col items-center gap-4`}>
          <span className={`text-3xl font-bold font-montserrat`}>
            Contact Info
          </span>
          <span className={`text-gray-100/40 font-wsans text-sm`}>
            Please enter your contact information below so we can keep you
            updated on your order!
          </span>
          <div className={`flex flex-col gap-2 w-full grow`}>
            <div
              className={`flex flex-col gap-4 w-full grow items-center justify-center`}
            >
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
                className={`bg-gray-700/30 text-gray-100/80 px-6 py-3 rounded-2xl w-full text-xl font-medium font-wsans focus:outline-none focus:ring-purple-500 ring-2 transition-all ring-transparent placeholder:text-2xl placeholder:font-medium placeholder:text-gray-100/40 placeholder:align-middle max-w-[45ch]`}
                placeholder={"Name"}
                onChange={(e) => {
                  setOrderName(e.target.value);
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
                value={orderName}
                autoFocus
              />
              <motion.div className={`flex flex-row gap-4 items-center w-full`}>
                <motion.span
                  className={`text-gray-100/40 font-bold text-xl text-center`}
                  variants={{
                    hidden: {
                      opacity: 0,
                      transform: "translate3d(0, -100px, 0)",
                    },
                    visible: {
                      opacity: 1,
                      transform: "translate3d(0, 0px, 0)",
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
                      transform: "translate3d(0, -100px, 0)",
                    },
                    visible: {
                      opacity: 1,
                      transform: "translate3d(0, 0px, 0)",
                      transition: {
                        duration: 1,
                        type: "spring",
                        bounce: 0.5,
                      },
                    },
                  }}
                  type="text"
                  className={`bg-gray-700/30 text-gray-100/80 p-3 py-3 w-16 rounded-2xl text-xl font-medium font-wsans focus:outline-none focus:ring-purple-500 ring-2 transition-all ring-transparent placeholder:text-2xl placeholder:font-medium placeholder:text-gray-100/40 placeholder:align-middle`}
                  placeholder={"1"}
                  onChange={(e) => {
                    setOrderPhoneCountryCode(e.target.value);
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
                  value={orderPhoneCountryCode}
                  autoFocus
                />
                <motion.input
                  //   variants={animateItem}
                  variants={{
                    hidden: {
                      opacity: 0,
                      transform: "translate3d(0, -100px, 0)",
                    },
                    visible: {
                      opacity: 1,
                      transform: "translate3d(0, 0px, 0)",
                      transition: {
                        duration: 1,
                        type: "spring",
                        bounce: 0.5,
                      },
                    },
                  }}
                  type="tel"
                  className={`bg-gray-700/30 text-gray-100/80 px-6 py-3 rounded-2xl w-full text-xl font-medium font-wsans focus:outline-none focus:ring-purple-500 ring-2 transition-all ring-transparent placeholder:text-2xl placeholder:font-medium placeholder:text-gray-100/40 placeholder:align-middle max-w-[45ch]`}
                  placeholder={"123-456-7890"}
                  onChange={(e) => {
                    setOrderPhone(e.target.value.replace(/[^0-9]/g, ""));
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
                  value={orderPhone}
                  autoFocus
                />
              </motion.div>
            </div>
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
                checked={getPoints}
                onChange={(e) => {
                  setGetPoints(e.target.checked);
                }}
                className="w-4 h-4 text-purple-500 accent-purple-500 rounded-lg focus:ring-purple-500  focus:ring-2 bg-gray-700 border-gray-600"
              />
              <label
                htmlFor="optin"
                className="ms-2 text-xs font-medium text-gray-100/40"
              >
                I would love to join the rewards program and earn free stuff!
                (Don&apos;t worry, we won&apos;t spam you!) 🎉
              </label>
            </motion.div>
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
                id="phonecontact"
                type="checkbox"
                checked={allowPhoneContact}
                onChange={(e) => {
                  setAllowPhoneContact(e.target.checked);
                }}
                className="w-4 h-4 text-purple-500 accent-purple-500 rounded-lg focus:ring-purple-500  focus:ring-2 bg-gray-700 border-gray-600"
              />
              <label
                htmlFor="phonecontact"
                className="ms-2 text-xs font-medium text-gray-100/40"
              >
                Please contact me via phone for order updates.
              </label>
            </motion.div>
            <button
              className={`bg-black shrink-0 text-white w-full px-4 h-12 rounded-2xl group hover:bg-white hover:text-black transition-all duration-150 relative z-10 disabled:opacity-20`}
              onClick={async () => {
                setCreatingSession(true);
                await fetcher("/api/stripe/createCheckoutSession", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    basket: shoppingCart.map((item) => ({
                      product: item.product,
                      preferences: item.preferences,
                      quantity: item.quantity,
                    })),
                    name: orderName,
                    phoneNumber: `+${orderPhoneCountryCode}${orderPhone}`,
                    signupForAccount: getPoints,
                    delivery,
                    deliveryAddress: `${deliveryLocation} ${deliveryAddress}`,
                  }),
                }).then(async (resp) => {
                  if (resp.ok) {
                    const res = await resp.json();
                    router.push(res.sessionURL);
                  }
                  setCreatingSession(false);
                });
                localStorage.setItem("delivery", `${delivery}`);
                localStorage.setItem("deliveryAddress", `${deliveryAddress}`);
                localStorage.setItem("deliveryLocation", `${deliveryLocation}`);
              }}
              disabled={
                creatingSession ||
                !orderName ||
                !orderPhone ||
                orderPhone.length < 10 ||
                orderPhoneCountryCode.length < 1 ||
                orderPhoneCountryCode.length > 4 ||
                orderName.length < 3
              }
            >
              <div
                className="flex flex-row gap-2 items-center justify-center
                relative z-10 text-sm"
              >
                {/* <Star className={`text-lg w-6 h-6`} /> */}
                <span className={`font-bold`}>
                  Place Order ($
                  {shoppingCart
                    .reduce(
                      (acc, curr) =>
                        acc +
                        calculateItemPrice(curr.product, curr.preferences) *
                          curr.quantity,
                      0 + (delivery ? 1 : 0)
                    )
                    .toFixed(2)}
                  )
                </span>
              </div>
            </button>
          </div>
        </div>
      </Modal>
      <div className={`fixed bottom-4 left-0 w-24 h-24 p-4 `}>
        <button
          className={`flex flex-row gap-4 border border-gray-100/10 bg-black/50 backdrop-blur-xl w-full h-full rounded-full p-2 items-center`}
          onClick={() => {
            setShoppingCartOpened(true);
          }}
        >
          <div className={`relative w-12 h-12 p-3 bg-gray-800/50 rounded-full`}>
            <HiOutlineShoppingBag className={`w-full h-full`} />
            <div
              className={`absolute top-0 right-0 w-5 h-5 bg-gradient-to-br from-indigo-300 via-red-300 to-yellow-400 rounded-full text-white text-xs flex items-center justify-center`}
            >
              {shoppingCart.length}
            </div>
          </div>
        </button>
      </div>
    </>
  );
};
export default MenuPage;
export const getStaticProps = async () => {
  return {
    props: {
      products,
    },
  };
};
