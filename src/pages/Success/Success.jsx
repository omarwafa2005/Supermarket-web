import { useMemo, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { clearLastOrder, getLastOrder } from "../../utils/orders";

const Success = () => {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const order = useMemo(() => {
    return getLastOrder();
  }, []);

  const clearOrder = () => {
    clearLastOrder();
  };

  return (
    <section className={`min-h-[80vh] px-6 py-16 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className={`mx-auto max-w-4xl rounded-3xl border p-8 text-center shadow-xl ${darkMode ? "border-gray-800 bg-gray-800" : "border-gray-200 bg-white"}`}>
        <h1 className="mb-6 text-6xl">✅</h1>

        <h2 className="mb-4 text-4xl font-bold">
          Order placed successfully!
        </h2>

        <p className={`mb-8 text-xl ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
          Thank you for shopping with us.
        </p>

        {order && (
          <div className={`mx-auto mb-8 grid max-w-2xl gap-4 rounded-2xl p-5 text-left sm:grid-cols-2 ${darkMode ? "bg-gray-900/50" : "bg-gray-50"}`}>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-green-600">
                Payment method
              </p>
              <p className="mt-2 font-semibold">{order.paymentLabel}</p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-green-600">
                Estimated delivery
              </p>
              <p className="mt-2 font-semibold">{order.estimatedDelivery}</p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-green-600">
                Customer
              </p>
              <p className="mt-2 font-semibold">{order.customer.name}</p>
              <p className={darkMode ? "text-sm text-gray-300" : "text-sm text-gray-500"}>
                {order.customer.phone}
              </p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-green-600">
                Total paid
              </p>
              <p className="mt-2 font-semibold text-green-600">
                ${order.grandTotal.toFixed(2)}
              </p>
            </div>

            {order.discountAmount > 0 && (
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-green-600">
                  Coupon
                </p>
                <p className="mt-2 font-semibold">
                  {order.couponCode || "Applied"}
                </p>
                <p className={darkMode ? "text-sm text-gray-300" : "text-sm text-gray-500"}>
                  Saved ${Number(order.discountAmount || 0).toFixed(2)}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4">
          {order && (
            <Link
              to={`/orders/${order.id}`}
              onClick={clearOrder}
              className={`rounded-full border px-8 py-3 font-semibold transition ${darkMode ? "border-gray-700 hover:border-green-600 hover:text-green-400" : "border-gray-300 hover:border-green-600 hover:text-green-600"}`}
            >
              Track order
            </Link>
          )}

          <Link
            to="/products"
            onClick={clearOrder}
            className="rounded-full bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            Continue shopping
          </Link>

          <button
            type="button"
            onClick={() => {
              clearOrder();
              navigate("/");
            }}
            className={`rounded-full border px-8 py-3 font-semibold transition ${darkMode ? "border-gray-700 hover:border-green-600 hover:text-green-400" : "border-gray-300 hover:border-green-600 hover:text-green-600"}`}
          >
            Back to home
          </button>
        </div>
      </div>
    </section>
  );
};

export default Success;