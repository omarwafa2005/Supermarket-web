import { useContext, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { ThemeContext } from "../../context/ThemeContext";
import { getOrderById } from "../../utils/orders";

const trackingSteps = [
  "Pending payment on delivery",
  "Paid",
  "Confirmed",
  "Preparing",
  "Out for delivery",
  "Delivered",
];

const normalizeStatus = (order) =>
  order?.status || (order?.paymentMethod === "card" ? "Paid" : "Pending payment on delivery");

const OrderDetails = () => {
  const { orderId } = useParams();
  const { addToCart } = useContext(CartContext);
  const { darkMode } = useContext(ThemeContext);

  const order = useMemo(() => getOrderById(orderId), [orderId]);

  if (!order) {
    return (
      <section className={`mx-auto max-w-3xl px-6 py-16 text-center ${darkMode ? "text-white" : "text-black"}`}>
        <h1 className="text-4xl font-bold">Order not found</h1>
        <p className={`mt-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          The order you are looking for does not exist on this device.
        </p>
        <Link to="/my-orders" className="mt-8 inline-flex rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700">
          Back to orders
        </Link>
      </section>
    );
  }

  const activeStatus = normalizeStatus(order);
  const activeIndex = trackingSteps.findIndex((step) => step === activeStatus);

  const handleReorder = () => {
    order.items.forEach((item) => {
      addToCart(item);
    });
  };

  return (
    <section className={`mx-auto max-w-6xl px-6 py-16 ${darkMode ? "text-white" : "text-black"}`}>
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-green-600">
            Order tracking
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            {order.id}
          </h1>

          <p className={`mt-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {order.customer?.name || "Guest"} · {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleReorder}
            className="rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            Reorder items
          </button>

          <Link
            to="/my-orders"
            className={`rounded-full border px-6 py-3 font-semibold transition ${darkMode ? "border-gray-700 hover:border-green-600 hover:text-green-400" : "border-gray-300 hover:border-green-600 hover:text-green-600"}`}
          >
            Back to orders
          </Link>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className={`rounded-3xl border p-6 shadow-sm ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
          <h2 className="text-2xl font-bold">Delivery progress</h2>

          <div className="mt-6 space-y-4">
            {trackingSteps.map((step, index) => {
              const complete = activeIndex >= index;
              const current = activeIndex === index;

              return (
                <div key={step} className="flex items-start gap-4">
                  <div className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${complete ? "bg-green-600 text-white" : darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-500"}`}>
                    {index + 1}
                  </div>

                  <div className={`flex-1 rounded-2xl border p-4 ${current ? "border-green-600 bg-green-600/5" : darkMode ? "border-gray-800 bg-gray-950/40" : "border-gray-200 bg-gray-50"}`}>
                    <p className="font-semibold">{step}</p>
                    <p className={`mt-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {current ? "Current status" : complete ? "Completed" : "Waiting"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className={`rounded-3xl border p-6 shadow-sm ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
            <h2 className="text-2xl font-bold">Order summary</h2>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Payment</span>
                <span className="font-semibold">{order.paymentLabel}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Status</span>
                <span className={`rounded-full px-3 py-1 font-semibold ${order.paymentMethod === "card" ? "bg-blue-500/10 text-blue-600" : "bg-green-500/10 text-green-600"}`}>
                  {activeStatus}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Items</span>
                <span className="font-semibold">{order.itemCount}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Delivery fee</span>
                <span className="font-semibold">{order.deliveryFee === 0 ? "Free" : `$${Number(order.deliveryFee || 0).toFixed(2)}`}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Coupon discount</span>
                <span className="font-semibold text-green-600">
                  {Number(order.discountAmount || 0) > 0 ? `- $${Number(order.discountAmount || 0).toFixed(2)}` : "$0.00"}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-dashed pt-3 text-lg font-bold">
                <span>Total</span>
                <span className="text-green-600">${Number(order.grandTotal || 0).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className={`rounded-3xl border p-6 shadow-sm ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
            <h2 className="text-2xl font-bold">Delivery address</h2>
            <p className={`mt-3 leading-7 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              {order.customer?.address || "No address provided"}
            </p>

            <p className={`mt-4 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Estimated delivery: {order.estimatedDelivery || "N/A"}
            </p>
          </div>

          <div className={`rounded-3xl border p-6 shadow-sm ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
            <h2 className="text-2xl font-bold">Items</h2>

            {order.couponCode && (
              <div className={`mt-4 rounded-2xl px-4 py-3 text-sm font-semibold ${darkMode ? "bg-green-600/10 text-green-400" : "bg-green-50 text-green-700"}`}>
                Coupon applied: {order.couponCode} {order.couponLabel ? `(${order.couponLabel})` : ""}
              </div>
            )}

            <div className="mt-4 space-y-3">
              {order.items.map((item) => (
                <div key={`${order.id}-${item.id}`} className={`flex items-center justify-between rounded-2xl px-4 py-3 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <span className="font-semibold text-green-600">
                    ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;