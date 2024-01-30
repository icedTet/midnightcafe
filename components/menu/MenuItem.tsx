import { BiFoodMenu } from "react-icons/bi";
import { GenericProduct } from "../../pages/menu";
import { HiOutlinePaintBrush } from "react-icons/hi2";

export const MenuItem = ({ product }: { product: GenericProduct }) => {
  return (
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
            <span className={`font-wsans font-medium text-sm text-gray-100/40`}>
              ${product.price}
            </span>
          </div>
          <span className={`text-sm font-medium`}>{product.description}</span>
        </div>
        <div
          className={`flex flex-row gap-2 items-center justify-between w-full`}
        >
          <button
            className={`bg-gray-100 text-black w-full px-4 pr-6 h-10 rounded-2xl group hover:text-black transition-all duration-150 relative`}
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
  );
};
