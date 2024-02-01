import { useMemo, useState } from "react";
import { OrderData } from "../utils/types";
import { useAPIProp } from "../utils/useProp";
import dayjs from "dayjs";
import {
  CupsizeModiferNames,
  cupsizePrices,
  ToppingModiferNames,
  toppingPrices,
} from "../utils/Items";
import { Modal } from "../components/Modal";
import { fetcher } from "../utils/fetcher";
const orderStatusTypes = [
  "being prepared",
  "being delivered",

  "delivered",
  "ready for pickup",
];
export const Fufilment = () => {
  const [orders, updateOrders] = useAPIProp<OrderData[]>({
    APIPath: "/api/admin/orders",
    cacheable: false,
  });
  const [viewComplete, setViewComplete] = useState(false);
  const [viewStatusUpdate, setViewStatusUpdate] = useState("");
  const [updatingOrder, setUpdatingOrder] = useState("");
  const updateOrder = async (id: string, status: string) => {
    if (updatingOrder) return;
    setUpdatingOrder(id);
    // update order status
    const resp = await fetcher("/api/admin/updateOrderStatus", {
      method: "POST",
      body: JSON.stringify({ orderID: id, status }),
    });
    if (resp.ok) {
      console.log("Order status updated");
      await updateOrders();
      setUpdatingOrder("");
    }
  };
  useMemo(() => {
    // sort first by order status. First should be statuses not in orderStatusTypes
    // then sort by orderStatusTypes then by time descending
    if (orders) {
      orders.sort((a, b) => {
        if (orderStatusTypes.indexOf(a.status!) === -1) {
          return -1;
        }
        if (orderStatusTypes.indexOf(b.status!) === -1) {
          return 1;
        }
        if (
          orderStatusTypes.indexOf(a.status!) <
          orderStatusTypes.indexOf(b.status!)
        ) {
          return -1;
        }
        if (
          orderStatusTypes.indexOf(a.status!) >
          orderStatusTypes.indexOf(b.status!)
        ) {
          return 1;
        }
        return b.date - a.date;
      });
    }
  }, [orders]);

  return (
    <div className={` mx-auto max-w-4xl w-[85%] flex flex-col gap-8`}>
      <h1 className="text-4xl font-bold font-montserrat"> Orders </h1>
      {orders === undefined && "Loading..."}
      {orders === null && "Error loading orders"}
      {/* {!!orders && JSON.stringify(orders)} */}
      <div className={`flex flex-row items-start gap-4`}>
        {orders?.map((order) => {
          return (
            <>
              <div className="flex flex-col gap-2 p-4 bg-gray-900 rounded-xl" key={`order-${order._id}`}>
                <div className={`flex flex-col gap-0`}>
                  <span className="text-gray-100/60 font-bold text-xl">
                    {order.name}
                  </span>
                  <span className="text-gray-100/20">
                    {order._id.toString()}
                  </span>
                  <span className="text-gray-100/40">
                    {order.basket.length} Item
                    {order.basket.length > 1 ? "s" : ""}
                  </span>
                  <span className="text-gray-100/40">
                    Placed {dayjs(order.date).format("MMMM D, YYYY h:mm A")}
                  </span>
                  <span className="text-gray-100/40">
                    Send to {order.deliveryAddress}
                  </span>
                </div>
                <div className={`flex flex-col gap-4`}>
                  {order.basket.map((item,ind) => {
                    const { preferences, product } = item;
                    return (
                      <div
                        className={`flex flex-col gap-1 items-start border border-gray-100/10 p-4 rounded-xl`}
                        key={`order-item-${ind}-${order._id}`}
                      >
                        <div className={`flex flex-row text-xl gap-4`}>
                          <span>{item.quantity}x</span>
                          <span>{item.product.name}</span>
                        </div>
                        <div
                          className={`flex flex-col items-start text-gray-100/60`}
                        >
                          {typeof preferences.ice !== "undefined" && (
                            <div
                              className={`flex flex-row gap-2 items-center `}
                            >
                              - {preferences.ice}% Ice
                            </div>
                          )}
                          {typeof preferences.sugar !== "undefined" && (
                            <div
                              className={`flex flex-row gap-2 items-center `}
                            >
                              - {preferences.sugar}% Sweet
                            </div>
                          )}
                          {preferences.cupsize && (
                            <div
                              className={`flex flex-row gap-2 items-center `}
                            >
                              - {CupsizeModiferNames[preferences.cupsize]}{" "}
                              {!!cupsizePrices[preferences.cupsize] &&
                                `($${cupsizePrices[preferences.cupsize]})`}
                            </div>
                          )}
                          {!!preferences.toppings?.length && (
                            <div
                              className={`flex flex-row gap-2 items-center `}
                            >
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
                    );
                  })}
                </div>
                <span className="text-gray-100/40">
                  {order.status || "No Order Status Available"}
                </span>
                <button
                  className="bg-indigo-500 p-2 rounded-xl"
                  onClick={() => setViewStatusUpdate(order._id.toString())}
                >
                  Update Status
                </button>
              </div>
              <Modal
                visible={viewStatusUpdate === order._id.toString()}
                onClose={() => setViewStatusUpdate("")}
                key={`modal-order-${order._id}`}
              >
                <div className="flex flex-col gap-4 p-4 bg-gray-800 rounded-xl">
                  <h1 className="text-2xl font-bold font-montserrat">
                    Update Order Status
                  </h1>
                  <div className="flex flex-col gap-4">
                    {orderStatusTypes.map((status) => {
                      return (
                        <button
                          className="bg-indigo-500 p-2 rounded-xl disabled:opacity-50"
                          disabled={
                            updatingOrder === order._id.toString() ||
                            ((status === "being delivered" ||
                              status === "delivered") &&
                              !order.delivery)
                          }
                          key={`order-status-${status}-${order._id}`}
                          onClick={() => {
                            // update order status
                            updateOrder(order._id.toString(), status).then(
                              () => {
                                setViewStatusUpdate("");
                              }
                            );
                            // setViewStatusUpdate("");
                          }}
                        >
                          {status}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </Modal>
            </>
          );
        })}
      </div>
    </div>
  );
};
export default Fufilment;
