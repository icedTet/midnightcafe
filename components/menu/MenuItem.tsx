import { BiFoodMenu } from "react-icons/bi";
import {
  GenericProduct,
  ToppingModiferNames,
  ToppingTypes,
  ToppingsModifiers,
  toppingPrices,
} from "../../pages/menu";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { Modal } from "../Modal";
import { useState } from "react";
const IceLevels = [
  {
    name: "100%",
    value: 100,
    default: true,
  },
  {
    name: "75%",
    value: 75,
  },
  {
    name: "50%",
    value: 50,
  },
  {
    name: "25%",
    value: 25,
  },
  {
    name: "0%",
    value: 0,
  },
];
const SugarLevels = [
  {
    name: "200%",
    value: 200,
  },
  {
    name: "175%",
    value: 175,
  },
  {
    name: "150%",
    value: 150,
  },
  {
    name: "125%",
    value: 125,
  },
  {
    name: "100%",
    value: 100,
    default: true,
  },
  {
    name: "75%",
    value: 75,
  },
  {
    name: "50%",
    value: 50,
  },
  {
    name: "25%",
    value: 25,
  },
  {
    name: "0%",
    value: 0,
  },
];
export const MenuItem = ({
  product,
  onClick,
  selected,
  setSelectedItem,
}: {
  product: GenericProduct;
  onClick?: () => void;
  selected?: boolean;
  setSelectedItem?: (id: string) => void;
}) => {
  const [prefs, setPrefs] = useState<ToppingsModifiers>({});
  return (
    <>
      <Modal
        visible={!!selected}
        onClose={() => {
          setSelectedItem?.("");
        }}
        className={`w-[85%] max-w-4xl md:w-full h-5/6 flex flex-col md:flex-col gap-4 md:items-center p-8 overflow-auto justify-between`}
      >
        <div className={`flex flex-row gap-8`}>
          <img
            src={product.image}
            className={`w-20 h-20 object-cover rounded-2xl shrink-0`}
          />
          <div className={`flex flex-col gap-4 items-start w-full`}>
            <h3 className={`font-montserrat font-bold text-lg w-full`}>
              {product.name}
            </h3>
            <span className={`text-sm font-medium`}>{product.description}</span>
            <span
              className={`font-wsans font-medium text-base text-gray-100/40`}
            >
              ${product.price}
            </span>
          </div>
        </div>
        <div className={`flex flex-col gap-6`}>
          {product.modifiers.includes("ice") && (
            <div className={`flex flex-col w-full gap-1`}>
              <div
                className={`flex flex-row gap-2 items-center justify-between`}
              >
                <span className={`font-montserrat font-bold text-lg`}>
                  Ice Level
                </span>
              </div>
              <div
                className={`grid grid-cols-5 gap-2 items-center justify-between`}
              >
                {
                  // "100%" | "75%" | "50%" | "25%" | "0% (No Ice)";
                  IceLevels.map((ice) => (
                    <button
                      className={`bg-gray-100/40 text-black w-full px-4 h-10 rounded-2xl group hover:text-black transition-all duration-150 relative md:text-center`}
                      onClick={() => {
                        setPrefs({
                          ...prefs,
                          ice: ice.value as any,
                        });
                      }}
                      key={`ice-${ice.value}`}
                    >
                      <div
                        className={`w-full h-full absolute top-0 left-0 bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 rounded-2xl group-hover:opacity-100 ${
                          prefs.ice === ice.value ||
                          (typeof prefs.ice === "undefined" && ice.default)
                            ? `opacity-100`
                            : `opacity-0`
                        } opacity-0 transition-all duration-200`}
                      />
                      <div className="flex flex-row gap-2 items-center justify-center relative z-10 text-sm">
                        {/* <Star className={`text-lg w-6 h-6`} /> */}
                        <span className={`font-bold`}>{ice.name}</span>
                      </div>
                    </button>
                  ))
                }
              </div>
            </div>
          )}
          {product.modifiers.includes("sugar") && (
            <div className={`flex flex-col w-full gap-1`}>
              <div
                className={`flex flex-row gap-2 items-center justify-between`}
              >
                <span className={`font-montserrat font-bold text-lg`}>
                  Sugar Level
                </span>
              </div>
              <div
                className={`grid grid-cols-5 gap-2 items-center justify-between`}
              >
                {
                  // "100%" | "75%" | "50%" | "25%" | "0% (No Ice)";
                  SugarLevels.map((sugar) => (
                    <button
                      className={`bg-gray-100/40 text-black w-full px-4 h-10 rounded-2xl group hover:text-black transition-all duration-150 relative`}
                      onClick={() => {
                        setPrefs({
                          ...prefs,
                          sugar: sugar.value as any,
                        });
                      }}
                        key={`sugar-${sugar.value}`}
                    >
                      <div
                        className={`w-full h-full absolute top-0 left-0 bg-gradient-to-br  from-pink-300 via-purple-300 to-indigo-400 rounded-2xl group-hover:opacity-100 ${
                          prefs.sugar === sugar.value ||
                          (typeof prefs.sugar === "undefined" && sugar.default)
                            ? `opacity-100`
                            : `opacity-0`
                        } opacity-0 transition-all duration-200`}
                      />
                      <div className="flex flex-row gap-2 items-center justify-center relative z-10 text-sm ">
                        {/* <Star className={`text-lg w-6 h-6`} /> */}
                        <span className={`font-bold`}>{sugar.name}</span>
                      </div>
                    </button>
                  ))
                }
              </div>
            </div>
          )}
          {product.modifiers.includes("toppings") && (
            <div className={`flex flex-col w-full gap-1`}>
              <div
                className={`flex flex-row gap-2 items-center justify-between`}
              >
                <span className={`font-montserrat font-bold text-lg`}>
                  Toppings ({prefs.toppings?.length || 0} selected)
                </span>
              </div>
              <div
                className={`grid md:grid-cols-1 xl:grid-cols-2 grid-cols-3 gap-2 items-center justify-between`}
              >
                {ToppingTypes.map((topping) => (
                  <button
                    className={`bg-gray-100/40 text-black w-full px-4 h-10 rounded-2xl group hover:text-black transition-all duration-150 relative`}
                    onClick={() => {
                      if (prefs.toppings?.includes(topping)) {
                        setPrefs({
                          ...prefs,
                          toppings: prefs.toppings?.filter(
                            (t) => t !== topping
                          ),
                        });
                      } else
                        setPrefs({
                          ...prefs,
                          toppings: [...(prefs.toppings || []), topping],
                        });
                    }}
                    key={`topping-${topping}`}
                  >
                    <div
                      className={`w-full h-full absolute top-0 left-0 bg-gradient-to-br  from-pink-300 via-purple-300 to-indigo-400 rounded-2xl ${
                        prefs.toppings?.includes(topping)
                          ? `opacity-100`
                          : `opacity-0`
                      } opacity-0 transition-all duration-200`}
                    />
                    <div
                      className={`w-full h-full absolute top-0 left-0 bg-gradient-to-br from-indigo-200 via-red-200 to-yellow-100 rounded-2xl group-hover:opacity-40 opacity-0 transition-all duration-500 blur-lg`}
                    />
                    <div className="flex flex-row gap-2 items-center justify-center relative z-10 text-sm ">
                      {/* <Star className={`text-lg w-6 h-6`} /> */}
                      <span className={`font-bold`}>
                        {ToppingModiferNames[topping]} ($
                        {toppingPrices[topping].toFixed(2)})
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <button
          className={`bg-black text-white w-full px-4 h-10 rounded-2xl group hover:bg-white hover:text-black transition-all duration-150 relative`}
        >
          <div className="flex flex-row gap-2 items-center justify-center relative z-10 text-sm ">
            {/* <Star className={`text-lg w-6 h-6`} /> */}
            <span className={`font-bold`}>
              Add to Order ($
              {product.price +
                (prefs.toppings?.reduce(
                  (acc, curr) => acc + toppingPrices[curr],
                  0
                ) || 0)}
              )
            </span>
          </div>
        </button>
      </Modal>

      <div
        className={` rounded-[2rem] border border-gray-100/5 bg-gray-900 relative overflow-hidden min-h-[30rem]`}
      >
        <div className={`cardBg`}>
          <img
            src={product.image}
            className={`w-full h-full rounded-[2rem] absolute top-0 left-0 blur-xl z-0 object-cover opacity-30`}
          />
        </div>
        <div
          className={`cardcontent flex flex-col gap-8 items-center justify-between w-full p-8 py-12 z-10 relative bg-gray-900/50 h-full`}
        >
          <div className={`flex flex-col gap-4 items-center w-full`}>
            <div className={`w-2/3 h-auto aspect-square relative`}>
              <img
                src={product.image}
                className={`w-full h-full rounded-full absolute top-0 left-0 blur-sm z-0 object-cover`}
              />
              <img
                src={product.image}
                className={`w-full h-full rounded-full z-10 relative`}
              />
            </div>
            {/* <img
src={product.image}
className={`w-2/3 h-auto rounded-full`}
/> */}
            <div
              className={`flex flex-row gap-2 items-center justify-between w-full`}
            >
              <h3 className={`font-montserrat font-bold text-lg w-full`}>
                {product.name}
              </h3>
              <span
                className={`font-wsans font-medium text-sm text-gray-100/40`}
              >
                ${product.price}
              </span>
            </div>
            <span className={`text-sm font-medium`}>{product.description}</span>
          </div>
          <div
            className={`flex flex-row gap-2 items-center justify-between w-full`}
          >
            <button
              className={`bg-gray-100/40 text-black w-full px-4 pr-6 h-10 rounded-2xl group hover:text-black transition-all duration-150 relative`}
              onClick={onClick}
            >
              <div
                className={`w-full h-full absolute top-0 left-0 bg-gradient-to-br from-indigo-200 via-red-200 to-yellow-100 rounded-2xl group-hover:opacity-100 opacity-0 transition-all duration-200`}
              />
              <div
                className={`w-full h-full absolute top-0 left-0 bg-gradient-to-br from-indigo-200 via-red-200 to-yellow-100 rounded-2xl group-hover:opacity-40 opacity-0 transition-all duration-500 blur-lg`}
              />
              <div className="flex flex-row gap-2 items-center justify-center relative z-10 ">
                {/* <Star className={`text-lg w-6 h-6`} /> */}
                <span className={`font-bold`}>Order</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
