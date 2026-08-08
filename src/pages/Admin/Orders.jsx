import { useContext } from "react";
import { useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import {
  deleteOrder,
  getStoredOrders,
  updateOrder,
} from "../../utils/orders";

const orderStatuses = [
  "Pending payment on delivery",
  "Confirmed",
  "Preparing",
  "Out for delivery",
  "Delivered",
  "Cancelled",
];

const Orders = () => {
  const { darkMode } = useContext(ThemeContext);
  const [orders, setOrders] = useState(() => getStoredOrders());

  const handleStatusChange = (orderId, status) => {
    setOrders(updateOrder(orderId, { status }));
  };

  const handleDelete = (orderId) => {
    setOrders(deleteOrder(orderId));
  };

  return (
    <section className={`mx-auto max-w-7xl px-6 py-12 ${darkMode ? "text-white" : "text-black"}`}>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-green-600">
          Fulfillment
        </p>

        <h1 className="mt-4 text-4xl font-bold">Orders</h1>
      </div>

      {orders.length === 0 ? (
          <div className={`rounded-2xl border border-dashed p-8 text-center shadow-sm ${darkMode ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"}`}>
          <p className="text-lg font-semibold">No orders yet</p>
            <p className={`mt-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Completed checkouts will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <article key={order.id} className={`rounded-3xl border p-6 shadow-sm ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold">{order.id}</h2>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${order.paymentMethod === "card" ? "bg-blue-500/10 text-blue-600" : "bg-green-500/10 text-green-600"}`}>
                      {order.paymentLabel}
                    </span>
                  </div>

                  <p className={`mt-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {order.customer?.name || "Guest"} · {order.customer?.phone || "No phone"} · {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
                  <span className={`rounded-full px-3 py-1 ${darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-700"}`}>
                    {order.itemCount} items
                  </span>
                  <span className={`rounded-full px-3 py-1 ${darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-700"}`}>
                    ${Number(order.grandTotal || 0).toFixed(2)}
                  </span>
                  <span className={`rounded-full px-3 py-1 ${order.paymentMethod === "card" ? "bg-blue-500/10 text-blue-600" : "bg-green-500/10 text-green-600"}`}>
                    {order.status || (order.paymentMethod === "card" ? "Paid" : "Pending")}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {order.items.map((item) => (
                  <span key={`${order.id}-${item.id}`} className={`rounded-full px-3 py-1 text-sm ${darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-700"}`}>
                    {item.name} x {item.quantity}
                  </span>
                ))}
              </div>

              <div className={`mt-6 flex flex-col gap-4 border-t border-dashed pt-5 ${darkMode ? "border-gray-800" : "border-gray-200"} lg:flex-row lg:items-center lg:justify-between`}>
                <div className="flex flex-wrap items-center gap-3">
                  <label className={`text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Update status
                  </label>

                  <select
                    value={order.status || (order.paymentMethod === "card" ? "Paid" : "Pending payment on delivery")}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className={`rounded-full border px-4 py-2 text-sm outline-none ${darkMode ? "border-gray-700 bg-gray-800 text-white" : "border-gray-300 bg-white text-black"}`}
                  >
                    {orderStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(order.id)}
                  className="rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
                >
                  Delete order
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Orders;