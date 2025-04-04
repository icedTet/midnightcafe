import exp from "constants";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  CupsizeModiferNames,
  cupsizePrices,
  ToppingModiferNames,
  toppingPrices,
  calculateItemPrice,
  GenericProduct,
  PreferenceModifiers,
} from "../utils/Items";

export const ThankYouPage = () => {
  const urlParams = useSearchParams();
  const shoppingCart = JSON.parse(urlParams.get("bag")!);
  useEffect(() => {
    localStorage.removeItem("shoppingCart");
  }, []);
  // thank you for your purchase
  return (
    <div className="flex flex-col items-start justify-start h-screen gap-8 mx-auto">
      <div className={`flex flex-col items-start justify-start gap-4`}>
        <h1 className="text-4xl font-bold">Thank you for your purchase!</h1>
        <p className="text-lg">
          You will receive an text confirmation shortly.
        </p>
      </div>
      <div
        className={`bg-gray-900/80 backdrop-blur-xl p-8 pt-6 rounded-2xl max-w-prose flex flex-col gap-4`}
      >
        <div className={`flex flex-col gap-2`}>
          <span className={`text-2xl font-bold`}>Order ID</span>
          <span
            className={`text-sm font-bold font-mono text-gray-100/40 p-2 px-4 bg-black/30 rounded-md`}
          >
            {urlParams.get("session_id") || "000000"}
          </span>
        </div>
        <div className={`flex flex-col gap-2`}>
          <span className={`text-2xl font-bold`}>Order Name</span>
          <span
            className={`text-sm font-bold font-mono text-gray-100/40 p-2 px-4 bg-black/30 rounded-md`}
          >
            {urlParams.get("name") || "John Doe"}
          </span>
        </div>
        <div className={`flex flex-col gap-2`}>
          <span className={`text-2xl font-bold`}>Delivery to </span>
          <span
            className={`text-sm font-bold font-mono text-gray-100/40 p-2 px-4 bg-black/30 rounded-md`}
          >
            {urlParams.get("deliveryAddress") ||
              "Tooker 4th floor Common Lounge"}
          </span>
        </div>
      </div>
      <div className=" bg-gray-900/80 backdrop-blur-xl p-8 pt-6 rounded-2xl max-w-prose flex flex-col gap-4">
        <h2 className="text-2xl font-bold pb-4">Order Summary</h2>
        <div className={`flex flex-col gap-8`}>
          {shoppingCart &&
            shoppingCart.map(
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
      </div>
    </div>
  );
};

export default ThankYouPage;
