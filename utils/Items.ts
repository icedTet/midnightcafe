export const AssamMilkTea = {
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

export const LycheeMilkTea = {
  id: "lycheemilk",
  type: "boba",
  name: "Lychee Milk Tea",
  price: 4.25,
  description:
    "A refreshing blend of lychee and creamy milk tea brewed to perfection using imported chinese lychee black tea leaves",
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
export const PassionfruitGreenTea = {
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

export const SesameBalls = {
  id: "sesameballs",
  type: "food",
  name: "Sesame Balls (6pcs)",
  price: 4,
  description:
    "A classic Chinese dessert, these chewy sesame balls are filled with sweet red bean paste. Comes in a set of 6 balls.",
  image: "/assets/food/sesameballs.jpg",
  modifiers: [],
  stripePriceId: "price_1Oe7aCAU6aQxCCBU0r2KI3mv",
} as FoodProduct;

export const products = [
  AssamMilkTea,
  LycheeMilkTea,
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
export interface BobaProduct extends GenericProduct {
  type: "boba";
  modifiers: ["toppings", "sugar", "ice", "cupsize"];
}
export interface FoodProduct extends GenericProduct {
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

export const toppingStripePriceIds = {
  boba: "price_1Od9tpAU6aQxCCBUGwjhp7cW",
  lycheejelly: "price_1OeTgDAU6aQxCCBU8Pn9q3VQ",
} as Record<ToppingModifiers, string>;
