import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { getOrderStats } from "../../utils/orders";
import { getProducts } from "../../utils/products";
import { getStoredUsers } from "../../utils/users";

const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext);
  const products = getProducts();
  const users = getStoredUsers();
  const {
    orders,
    totalOrders,
    totalRevenue,
    totalItemsSold,
    cashOrders,
    cardOrders,
    uniqueCustomers,
    pendingOrders,
    confirmedOrders,
    preparingOrders,
    deliveredOrders,
  } = getOrderStats();

  const stats = [
    {
      title: "Products",
      value: products.length,
      tone: "bg-green-600",
      note: "Catalog items available",
    },
    {
      title: "Orders",
      value: totalOrders,
      tone: "bg-blue-600",
      note: "Orders saved on this device",
    },
    {
      title: "Customers",
      value: Math.max(uniqueCustomers, users.length),
      tone: "bg-purple-600",
      note: "Registered profiles and customer names",
    },
    {
      title: "Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      tone: "bg-red-600",
      note: `${totalItemsSold} total items sold`,
    },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <section className={`mx-auto max-w-7xl px-6 py-16 ${darkMode ? "text-white" : "text-black"}`}>
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-green-600">
          Operations overview
        </p>

        <h1 className="mt-4 text-5xl font-bold">
          Admin Dashboard
        </h1>

        <p className={`mt-4 max-w-3xl ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Track order flow, update statuses, and monitor sales from the local store data.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className={`${stat.tone} rounded-2xl p-6 text-white shadow-lg`}>
            <h2 className="text-lg font-medium opacity-90">{stat.title}</h2>
            <p className="mt-4 text-4xl font-black">{stat.value}</p>
            <p className="mt-3 text-sm text-white/80">{stat.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className={`rounded-3xl border p-6 shadow-sm ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Recent orders</h2>
              <p className={`mt-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Latest saved orders in local storage.
              </p>
            </div>

            <div className="flex gap-2 text-sm font-medium">
              <span className="rounded-full bg-green-500/10 px-3 py-1 text-green-600">
                Cash {cashOrders}
              </span>
              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-blue-600">
                Card {cardOrders}
              </span>
            </div>
          </div>

          {recentOrders.length === 0 ? (
            <div className={`mt-6 rounded-2xl border border-dashed p-8 text-center ${darkMode ? "border-gray-700" : "border-gray-300"}`}>
              <p className="text-lg font-semibold">No orders yet</p>
              <p className={`mt-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Once a checkout is completed, order data will appear here.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className={`rounded-2xl border p-4 ${darkMode ? "border-gray-800 bg-gray-950/40" : "border-gray-200 bg-gray-50/60"}`}>
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-bold">{order.id}</p>
                      <p className={`mt-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {order.customer?.name || "Guest"} · {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
                      <span className={`rounded-full px-3 py-1 ${darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-700"}`}>
                        {order.paymentLabel}
                      </span>
                      <span className={`rounded-full px-3 py-1 ${order.paymentMethod === "card" ? "bg-blue-500/10 text-blue-600" : "bg-green-500/10 text-green-600"}`}>
                        {order.status || (order.paymentMethod === "card" ? "Paid" : "Pending")}
                      </span>
                      <span className={`rounded-full px-3 py-1 ${darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-700"}`}>
                        ${Number(order.grandTotal || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {order.items.slice(0, 4).map((item) => (
                      <span key={`${order.id}-${item.id}`} className={`rounded-full px-3 py-1 text-sm ${darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-700"}`}>
                        {item.name} x {item.quantity}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={`rounded-3xl border p-6 shadow-sm ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
          <h2 className="text-2xl font-bold">Quick insights</h2>

          <div className="mt-6 space-y-4">
            <div className={`rounded-2xl p-4 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <p className="text-sm uppercase tracking-[0.2em] text-green-600">Average order value</p>
              <p className="mt-2 text-3xl font-black">${totalOrders === 0 ? "0.00" : (totalRevenue / totalOrders).toFixed(2)}</p>
            </div>

            <div className={`rounded-2xl p-4 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <p className="text-sm uppercase tracking-[0.2em] text-green-600">Total items sold</p>
              <p className="mt-2 text-3xl font-black">{totalItemsSold}</p>
            </div>

            <div className={`rounded-2xl p-4 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <p className="text-sm uppercase tracking-[0.2em] text-green-600">Payment mix</p>
              <p className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Cash orders: {cashOrders}, Card orders: {cardOrders}
              </p>
            </div>

            <div className={`rounded-2xl p-4 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <p className="text-sm uppercase tracking-[0.2em] text-green-600">Order pipeline</p>
              <p className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Pending: {pendingOrders}, Confirmed: {confirmedOrders}, Preparing: {preparingOrders}, Delivered: {deliveredOrders}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;