import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { ThemeContext } from "../../context/ThemeContext";
import { getStoredOrders } from "../../utils/orders";

const MyOrders = () => {
  const { addToCart } = useContext(CartContext);
  const { darkMode } = useContext(ThemeContext);

  const orders = useMemo(() => getStoredOrders(), []);

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      addToCart(item);
    });
  };

  const getActiveStatus = (order) =>
    order.status || (order.paymentMethod === "card" ? "Paid" : "Pending payment on delivery");

  return (
    <section className={`mx-auto max-w-7xl px-6 py-16 ${darkMode ? "text-white" : "text-black"}`}>
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-green-600">
          Track your orders
        </p>

        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
          My Orders
        </h1>

        <p className={`mt-4 text-base sm:text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Review your recent purchases and reorder with one click.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className={`mx-auto max-w-2xl rounded-3xl border p-8 text-center shadow-sm ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
          <h2 className="text-2xl font-bold">No orders yet</h2>

          <p className={`mt-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Once you place an order, it will appear here on this device.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <article
              key={order.id}
              className={`rounded-3xl border p-6 shadow-sm ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold">{order.id}</h2>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${order.paymentMethod === "card" ? "bg-blue-500/10 text-blue-600" : "bg-green-500/10 text-green-600"}`}>
                      {order.paymentLabel}
                    </span>
                  </div>

                  <p className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Placed by {order.customer?.name || "Guest"} on {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleReorder(order)}
                    className="rounded-full bg-green-600 px-5 py-2.5 font-semibold text-white transition hover:bg-green-700"
                  >
                    Reorder
                  </button>

                  <Link
                    to="/checkout"
                    className={`rounded-full border px-5 py-2.5 font-semibold transition ${darkMode ? "border-gray-700 hover:border-green-600 hover:text-green-400" : "border-gray-300 hover:border-green-600 hover:text-green-600"}`}
                  >
                    Checkout
                  </Link>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-4">
                <div className={`rounded-2xl p-4 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                  <p className="text-sm uppercase tracking-[0.2em] text-green-600">Items</p>
                  <p className="mt-2 text-xl font-bold">{order.itemCount}</p>
                </div>

                <div className={`rounded-2xl p-4 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                  <p className="text-sm uppercase tracking-[0.2em] text-green-600">Total</p>
                  <p className="mt-2 text-xl font-bold">${Number(order.grandTotal || 0).toFixed(2)}</p>
                </div>

                <div className={`rounded-2xl p-4 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                  <p className="text-sm uppercase tracking-[0.2em] text-green-600">Delivery</p>
                  <p className="mt-2 text-xl font-bold">{order.deliveryFee === 0 ? "Free" : `$${Number(order.deliveryFee || 0).toFixed(2)}`}</p>
                </div>

                <div className={`rounded-2xl p-4 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                  <p className="text-sm uppercase tracking-[0.2em] text-green-600">Status</p>
                  <p className="mt-2 text-xl font-bold">{getActiveStatus(order)}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to={`/orders/${order.id}`}
                  className={`rounded-full border px-5 py-2.5 font-semibold transition ${darkMode ? "border-gray-700 hover:border-green-600 hover:text-green-400" : "border-gray-300 hover:border-green-600 hover:text-green-600"}`}
                >
                  View details
                </Link>

                <span className={`rounded-full px-4 py-2 text-sm font-semibold ${order.paymentMethod === "card" ? "bg-blue-500/10 text-blue-600" : "bg-green-500/10 text-green-600"}`}>
                  {order.estimatedDelivery || "ETA not set"}
                </span>
              </div>

              <div className="mt-6">
                <p className="text-sm uppercase tracking-[0.25em] text-green-600">
                  Items in order
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {order.items.slice(0, 6).map((item) => (
                    <span
                      key={`${order.id}-${item.id}`}
                      className={`rounded-full px-3 py-1 text-sm ${darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-700"}`}
                    >
                      {item.name} x {item.quantity}
                    </span>
                  ))}

                  {order.items.length > 6 && (
                    <span className={`rounded-full px-3 py-1 text-sm ${darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-700"}`}>
                      +{order.items.length - 6} more
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyOrders;
