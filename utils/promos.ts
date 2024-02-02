import { GenericProduct, PreferenceModifiers, SesameBalls } from "./Items";
type OrderDetails = {
  userid?: string;
  phoneNumber?: string;
  basket: {
    product: GenericProduct;
    preferences: PreferenceModifiers;
    quantity: number;
  }[];
  lineItems: {
    price_data: {
      currency: string;
      product_data: {
        name: string;
        images: string[];

        description: string;
      };
      unit_amount: number;
    };
    quantity: number;
  }[];
  name: string;
  deliveryAddress: string;
  delivery: boolean;
  signupForAccount: boolean;
};
export const processPromos = async (order: OrderDetails) => {
  const promos = [
    await processOpeningSale(order),
    await processFatPandaDiscount(order),
  ]
    .flat(3)
    .filter((x) => x);

  removeProductIds(order);
  return promos;
};
const removeProductIds = (order: OrderDetails) => {
  order.lineItems.forEach((item) => {
    item.price_data.product_data.description =
      item.price_data.product_data.description.replace(/§(.+)/, "");
  });
};

// opening sale is buy one boba get one half off. Half off is applied to the cheaper item. if user buys 4 boba, the two cheapest are discounted. if user buys 2 or 3, only the cheapest is discounted.
export const processOpeningSale = async (order: OrderDetails) => {
  const bobaItems = order.basket.filter((item) => item.product.type === "boba");
  if (bobaItems.length < 2) return;
  const bobaLineItems = order.lineItems.filter((item) => {
    const id = item.price_data.product_data.description.match(/§(.+)/)?.[1];
    const bobaItem = bobaItems.find((boba) => boba.product.id === id);
    return bobaItem;
  });
  bobaLineItems.sort(
    (a, b) => a.price_data.unit_amount - b.price_data.unit_amount
  );
  for (let i = 0; i < Math.floor(bobaItems.length / 2); i++) {
    bobaLineItems[i].price_data.unit_amount = ~~(
      bobaLineItems[i].price_data.unit_amount / 2
    );
    bobaLineItems[i].price_data.product_data.description = bobaLineItems[
      i
    ].price_data.product_data.description.replace(/(§.+)/, "$1");
    bobaLineItems[
      i
    ].price_data.product_data.name = `${bobaLineItems[i].price_data.product_data.name}  (🎉 50% OFF — Opening Sale)`;
  }
  return ["Opening Sale"];
};
export const processFatPandaDiscount = async (order: OrderDetails) => {
  if (order.phoneNumber === "+14805492239") {
    order.lineItems.map((x) => {
      const id = x.price_data.product_data.description.match(/§(.+)/)?.[1];
      if (id === SesameBalls.id) {
        x.price_data.unit_amount = 2.4 * 100;
        x.price_data.product_data.name = `${x.price_data.product_data.name}  (🎉 26.7% OFF — Fat Panda Discount)`;
      }
    });
    return "Fat Panda Pranav Discount";
  }
  return null;
};
