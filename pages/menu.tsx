import { BiFoodMenu } from "react-icons/bi";
import { MenuItem } from "../components/menu/MenuItem";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Modal } from "../components/Modal";

export const MenuPage = (props: {
  products: (BobaProduct | FoodProduct)[];
}) => {
  const { products } = props;
  const [selectedItem, setSelectedItem] = useState("");
  return (
    <div
      className={`flex flex-col gap-8 items-center w-full max-w-4xl md:max-w-80 lg:max-w-xl py-16 relative z-0 mx-auto`}
    >
      <div className={`flex flex-col gap-0 items-center w-full`}>
        <h1 className="text-5xl lg:text-4xl md:text-3xl font-black w-full font-montserrat grow bg-gradient-to-br from-indigo-200 via-red-200 to-yellow-100 bg-clip-text leading-relaxed text-transparent">
          Menu
        </h1>
        <span className="text-md lg:text-sm md:text-xs font-medium w-full font-wsans grow text-gray-100/40">
          Stuff you can stuff in your mouth i suppose.
        </span>
      </div>
      <div
        className={` w-full grid grid-cols-3 lg:grid-cols-2 md:grid-cols-1 md: gap-8`}
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
          />
        ))}
      </div>
      {/* <div className={`min-h-[30rem] w-] md:flex hidden relative`}>
        <div
          className={`absolute top-0 left-0 w-full h-full flex flex-row gap-8 overflow-auto`}
        >
          {products.map((product) => (
            <MenuItem product={product} key={product.id} />
          ))}
        </div>
      </div> */}
    </div>
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
  name: "Sesame Balls",
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
export type ToppingsModifiers = {
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
export type CupsizeModifiers = "Regular" | "Large";
export type ToppingModifiers = "boba" | "lycheejelly";
export const ToppingModiferNames = {
  boba: "Boba",
  lycheejelly: "Lychee Jelly",
} as Record<ToppingModifiers, string>;
export const ToppingTypes =  [
  "boba",
  "lycheejelly",
] as ToppingModifiers[];
export const toppingPrices = {
  boba: 0.5,
  lycheejelly: 0.5,
} as Record<ToppingModifiers, number>;
export const cupsizePrices = {
  Regular: 0,
  Large: 1,
} as Record<CupsizeModifiers, number>;
