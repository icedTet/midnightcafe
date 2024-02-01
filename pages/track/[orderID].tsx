import { useEffect } from "react";
import {
  CupsizeModiferNames,
  cupsizePrices,
  ToppingModiferNames,
  toppingPrices,
  calculateItemPrice,
  GenericProduct,
  PreferenceModifiers,
} from "../../utils/Items";
import Mongo from "../../utils/clients/Mongo";

export const TrackPage = (props: {
  // {
  //     "_id": {
  //       "$oid": "65bae792ac89400bf85293dc"
  //     },
  //     "sessionID": "cs_live_a1PRmtshT8QqPa67mPbSkuxPLCp6sVdrO2xJrSal18h1Eur2AuXljeHOAj",
  //     "userID": null,
  //     "phoneNumber": "+13413562661",
  //     "basket": [
  //       {
  //         "product": {
  //           "id": "sesameballs",
  //           "type": "food",
  //           "name": "Sesame Balls (6pcs)",
  //           "price": 4,
  //           "description": "A classic Chinese dessert, these chewy sesame balls are filled with sweet red bean paste. Comes in a set of 6 balls.",
  //           "image": "/assets/food/sesameballs.jpg",
  //           "modifiers": [],
  //           "stripePriceId": "price_1Oe7aCAU6aQxCCBU0r2KI3mv"
  //         },
  //         "preferences": {},
  //         "quantity": 1
  //       }
  //     ],
  //     "total": 400,
  //     "subtotal": 400,
  //     "name": "Ronit Shah",
  //     "delivery": false,
  //     "deliveryAddress": "tooker ",
  //     "signupForAccount": true,
  //     "date": 1706747818270,
  //     "pointsGained": 378.3026048153911
  //   }
  orderData: {
    sessionID: string;
    phoneNumber: string;
    basket: {
      product: GenericProduct;
      preferences: PreferenceModifiers;
      quantity: number;
    }[];
    total: number;
    subtotal: number;
    name: string;
    delivery: boolean;
    deliveryAddress: string;
    signupForAccount: boolean;
    date: number;
    pointsGained: number;
    status?: string;
  };
  sankyou: string;
}) => {
  const { orderData, sankyou } = props;
  const shoppingCart = useEffect(() => {
    sankyou && localStorage.removeItem("shoppingCart");
  }, []);
  // thank you for your purchase
  return (
    <div className="flex flex-col items-start justify-start h-screen gap-8 mx-auto">
      <div className={`flex flex-col items-start justify-start gap-4`}>
        <h1 className="text-4xl font-bold">
          {sankyou ? "Thank you for your purchase!" : "Track your order"}
        </h1>
        <p className="text-lg">
          {sankyou
            ? "You will receive an text confirmation shortly."
            : "Here's whats happening with your order:"}
        </p>
      </div>
      <div
        className={`bg-gray-900/80 backdrop-blur-xl p-8 pt-6 rounded-2xl max-w-prose flex flex-col gap-4`}
      >
        <div className={`flex flex-col gap-2`}>
          <span className={`text-sm font-bold`}>Order Status</span>
          <span
            className={`text-4xl font-montserrat font-bold text-gray-100 p-2 px-4 rounded-md`}
          >
            {orderData.status || "Pending, in the system"}
          </span>
        </div>
        <div className={`flex flex-col gap-2`}>
          <span className={`text-sm font-bold`}>Order ID</span>
          <span
            className={`text-xl font-bold font-mono text-gray-100/40 p-2 px-4 bg-black/30 rounded-md break-all`}
          >
            {orderData.sessionID || "000000"}
          </span>
        </div>
        <div className={`flex flex-col gap-2`}>
          <span className={`text-sm font-bold`}>Order Name</span>
          <span
            className={`text-xl font-bold font-mono text-gray-100/40 p-2 px-4 bg-black/30 rounded-md`}
          >
            {orderData.name || "John Doe"}
          </span>
        </div>
        <div className={`flex flex-col gap-2`}>
          <span className={`text-sm font-bold`}>Delivery to </span>
          <span
            className={`text-xl font-bold font-mono text-gray-100/40 p-2 px-4 bg-black/30 rounded-md`}
          >
            {orderData.delivery
              ? orderData.deliveryAddress
              : "Tooker 4th floor Common Lounge (Pickup)"}
          </span>
        </div>
      </div>
      <div className=" bg-gray-900/80 backdrop-blur-xl p-8 pt-6 rounded-2xl max-w-prose flex flex-col gap-4">
        <h2 className="text-2xl font-bold pb-4">Order Summary</h2>
        <div className={`flex flex-col gap-8`}>
          {orderData.basket &&
            orderData.basket.map(
              (item: {
                product: GenericProduct;
                quantity: number;
                preferences: PreferenceModifiers;
              }) => {
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
                      <div
                        className={`flex flex-row gap-4 items-center w-full`}
                      >
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
                        <span className={`font-mono font-medium text-base`}>
                          x{" ".padStart(3 - `${quantity}`.length, " ")}
                          {quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
        </div>
        {orderData.basket.reduce(
          (acc, curr) =>
            acc +
            curr.quantity * calculateItemPrice(curr.product, curr.preferences),
          0
        ) !==
          orderData.total / 100 && (
          <>
            <span
              className={`text-base font-wsans font-medium text-gray-100/40`}
            >
              Subtotal: $
              {orderData.basket
                .reduce(
                  (acc, curr) =>
                    acc +
                    curr.quantity *
                      calculateItemPrice(curr.product, curr.preferences),
                  0
                )
                .toFixed(2)}
            </span>
            <span
              className={`text-base font-wsans font-medium text-gray-100/40 w-full text-end`}
            >
              Discounts and Promotional Offers: -$
              {Math.abs(orderData.total / 100 -
                orderData.basket.reduce(
                  (acc, curr) =>
                    acc +
                    curr.quantity *
                      calculateItemPrice(curr.product, curr.preferences),
                  0
                )).toFixed(2)}
            </span>
          </>
        )}
        <span className={`text-base font-wsans font-medium text-gray-100/40`}>
          Total: ${(orderData.total / 100).toFixed(2)}
        </span>
      </div>
    </div>
  );
};
export const getServerSideProps = async (context: any) => {
  const { orderID } = context.query;
  const db = await Mongo;
  const orderData = await db.db("Users").collection("orders").findOne({
    sessionID: orderID,
  });
  // @ts-ignore
  orderData?._id && (orderData._id = orderData._id.toString());
  return {
    props: {
      orderData,
      sankyou: context.query.thanks,
    },
  };
};

export default TrackPage;
