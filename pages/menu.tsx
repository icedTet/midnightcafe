import { BiFoodMenu } from "react-icons/bi";
import { MenuItem } from "../components/menu/MenuItem";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Modal } from "../components/Modal";
import { ShoppingCartItem } from "../utils/ShoppingCart";
import { HiOutlineShoppingBag } from "react-icons/hi2";

export const MenuPage = (props: {
  products: (BobaProduct | FoodProduct)[];
}) => {
  const { products } = props;
  const [selectedItem, setSelectedItem] = useState("");
  const [shoppingCart, setShoppingCart] = useState([] as ShoppingCartItem[]);
  const [shoppingCartOpened, setShoppingCartOpened] = useState(false);

  useEffect(() => {
    if (!shoppingCart.length) {
      const cart = localStorage.getItem("shoppingCart");
      if (cart && JSON.stringify(cart) !== JSON.stringify(shoppingCart)) {
        setShoppingCart(JSON.parse(cart));
      }
    }
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  }, [shoppingCart]);
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
        visible={shoppingCartOpened}
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
                      {preferences.ice && (
                        <div className={`flex flex-row gap-2 items-center `}>
                          - {preferences.ice}% Ice
                        </div>
                      )}
                      {preferences.sugar && (
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
                      {preferences.toppings && (
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
                    className={`flex flex-col md:flex-row md:justify-between md:items-center gap-1 items-end`}
                  >
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
                    <span
                      className={`font-wsans font-medium text-base text-gray-100/40`}
                    >
                      $
                      {(
                        calculateItemPrice(product, preferences) * quantity
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* <div className={`flex flex-col gap-6`}></div> */}
        <button
          className={`bg-black shrink-0 text-white w-full px-4 h-10 rounded-2xl group hover:bg-white hover:text-black transition-all duration-150 relative`}
          onClick={() => {
            setSelectedItem?.("");
          }}
        >
          <div className="flex flex-row gap-2 items-center justify-center relative z-10 text-sm ">
            {/* <Star className={`text-lg w-6 h-6`} /> */}
            <span className={`font-bold`}>
              Place Order ($
              {shoppingCart.reduce(
                (acc, curr) =>
                  acc +
                  calculateItemPrice(curr.product, curr.preferences) *
                    curr.quantity,
                0
              ).toFixed(2)}
              )
            </span>
          </div>
        </button>
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

const AssamMilkTea = {
  id: "assammilk",
  type: "boba",
  name: "House Milk Tea",
  price: 4.25,
  description:
    "Creamy milk tea brewed with premium Barooti Assam tea leaves made with homemade brown sugar syrup.",
  image: "/assets/drinks/assammilk.jpg",
  modifiers: ["toppings", "sugar", "ice", "cupsize"],
  stripePriceId: "price_1Oe7W5AU6aQxCCBUlRqZQggu",
} as BobaProduct;
// const ThaiMilkTea = {
//   type: "boba",
//   name: "Thai Milk Tea",
//   price: 4.25,
//   description:
//     "Indulge in the irresistible blend of rich, creamy milk tea brewed to perfection using imported Thai tea leaves",
//   image: "/thai-milk-tea.jpg",
//   modifiers: ["toppings", "sugar", "ice", "cupsize"],
//   stripePriceId: "price_1Od9bjAU6aQxCCBUm8xKFssN",
// } as BobaProduct;
const PassionfruitGreenTea = {
  id: "passionfruitgreentea",
  type: "boba",
  name: "Passion Fruit Green Tea",
  price: 4.25,
  description:
    "A refreshing blend of green tea and real passionfruit, topped with passionfruit seeds.",
  image: "/assets/drinks/passionfruitgreentea.jpg",
  modifiers: ["toppings", "sugar", "ice", "cupsize"],
  stripePriceId: "price_1Oe7VVAU6aQxCCBU4OWNkgEW",
} as BobaProduct;

const SesameBalls = {
  id: "sesameballs",
  type: "food",
  name: "Sesame Balls (6pcs)",
  price: 3,
  description:
    "A classic Chinese dessert, these chewy sesame balls are filled with sweet red bean paste. Comes in a set of 6 balls.",
  image: "/assets/food/sesameballs.jpg",
  modifiers: [],
  stripePriceId: "price_1Oe7aCAU6aQxCCBU0r2KI3mv",
} as FoodProduct;

const products = [
  AssamMilkTea,
  // ThaiMilkTea,
  PassionfruitGreenTea,
  SesameBalls,
];
export type ModifierType = "toppings" | "sugar" | "ice" | "cupsize";
export interface GenericProduct {
  id: string;
  type: "boba" | "drink" | "food";
  name: string;
  price: number;
  description: string;
  image: string;
  modifiers: ModifierType[];
  stripePriceId: string;
}
interface BobaProduct extends GenericProduct {
  type: "boba";
  modifiers: ["toppings", "sugar", "ice", "cupsize"];
}
interface FoodProduct extends GenericProduct {
  type: "food";
  // modifiers: ["spice", "sauce"];
}
export const calculateItemPrice = (
  product: GenericProduct,
  preferences: PreferenceModifiers
) => {
  return (
    product.price +
    (preferences.toppings?.reduce(
      (acc, curr) => acc + toppingPrices[curr],
      0
    ) || 0)
  );
};
export type PreferenceModifiers = {
  sugar?: SugarModifiers;
  ice?: IceModifiers;
  cupsize?: CupsizeModifiers;
  toppings?: ToppingModifiers[];
};
export type SugarModifiersNames =
  | "200%"
  | "175%"
  | "150%"
  | "125%"
  | "100% (US 100%)"
  | "75%"
  | "50% (Asian 100%)"
  | "25%"
  | "0%";
export type SugarModifiers = 200 | 175 | 150 | 125 | 100 | 75 | 50 | 25 | 0;
export type IceModifiersName = "100%" | "75%" | "50%" | "25%" | "0% (No Ice)";
export type IceModifiers = 100 | 75 | 50 | 25 | 0;
export type CupsizeModifiersName = "Regular" | "Large";
export type CupsizeModifiers = "reg" | "large";
export type ToppingModifiers = "boba" | "lycheejelly";
export const ToppingModiferNames = {
  boba: "Boba",
  lycheejelly: "Lychee Jelly",
} as Record<ToppingModifiers, string>;
export const CupsizeModiferNames = {
  reg: "Regular Cup (16oz / 473ml)",
  large: "Large (23oz / 680ml)",
} as Record<CupsizeModifiers, string>;

export const ToppingTypes = ["boba", "lycheejelly"] as ToppingModifiers[];
export const toppingPrices = {
  boba: 0.5,
  lycheejelly: 0.5,
} as Record<ToppingModifiers, number>;
export const cupsizePrices = {
  reg: 0,
  large: 1,
} as Record<CupsizeModifiers, number>;
