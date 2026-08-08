import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CartContext } from "../../context/CartContext";
import { ThemeContext } from "../../context/ThemeContext";
import { saveOrder } from "../../utils/orders";
import { findCouponByCode, getActiveCoupons } from "../../utils/coupons";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= 25 || subtotal === 0 ? 0 : 4.99;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const availableCoupons = getActiveCoupons();

  const discountBase = subtotal + deliveryFee;
  const discountAmount = appliedCoupon
    ? appliedCoupon.type === "percent"
      ? (discountBase * appliedCoupon.value) / 100
      : appliedCoupon.value
    : 0;

  const grandTotal = Math.max(discountBase - discountAmount, 0);

  const handleApplyCoupon = () => {
    const normalizedCode = couponCode.trim().toUpperCase();
    const nextCoupon = findCouponByCode(normalizedCode);

    if (!nextCoupon) {
      setAppliedCoupon(null);
      toast.error("Invalid coupon code.");
      return;
    }

    if (subtotal < Number(nextCoupon.minSubtotal || 0)) {
      setAppliedCoupon(null);
      toast.error(`This coupon needs a minimum subtotal of $${Number(nextCoupon.minSubtotal || 0).toFixed(2)}.`);
      return;
    }

    setAppliedCoupon({
      code: normalizedCode,
      ...nextCoupon,
    });

    toast.success(`Coupon applied: ${normalizedCode}`);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    toast.info("Coupon removed.");
  };

  const formatCardNumber = (value) => value.replace(/\D/g, "").slice(0, 16);

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);

    if (digits.length <= 2) {
      return digits;
    }

    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      navigate("/products");
      return;
    }

    if (paymentMethod === "card") {
      const normalizedCardNumber = cardNumber.replace(/\s/g, "");
      const normalizedCardCvv = cardCvv.replace(/\s/g, "");

      if (
        cardName.trim().length < 3 ||
        normalizedCardNumber.length < 16 ||
        cardExpiry.length !== 5 ||
        normalizedCardCvv.length < 3
      ) {
        toast.error("Please complete your card details.");
        return;
      }
    }

    const orderData = {
      id: `ORD-${Date.now()}`,
      customer: {
        name: name.trim(),
        address: address.trim(),
        phone: phone.trim(),
      },
      paymentMethod,
      paymentLabel: paymentMethod === "card" ? "Visa / Mastercard" : "Cash on delivery",
      status: paymentMethod === "card" ? "Paid" : "Pending payment on delivery",
      items: cartItems,
      itemCount,
      subtotal,
      deliveryFee,
      couponCode: appliedCoupon?.code || "",
      couponLabel: appliedCoupon?.label || "",
      discountAmount,
      grandTotal,
      estimatedDelivery: new Date(Date.now() + 2 * 60 * 60 * 1000).toLocaleString([], {
        weekday: "short",
        hour: "numeric",
        minute: "2-digit",
      }),
      createdAt: new Date().toISOString(),
    };

    saveOrder(orderData);

    toast.success("Order placed successfully!");
    clearCart();
    navigate("/success");
  };

  if (cartItems.length === 0) {
    return (
      <section
        className={`min-h-[80vh] flex items-center justify-center px-6 ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
      >
        <div className={`w-full max-w-lg rounded-2xl p-8 text-center shadow-xl ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h1 className="text-3xl font-bold">Your cart is empty</h1>

          <p className={`mt-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Add some products before you start checkout.
          </p>

          <button
            type="button"
            onClick={() => navigate("/products")}
            className="mt-8 rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            Browse products
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`min-h-[80vh] px-6 py-12 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.3fr_0.9fr]">
        <div className={`rounded-3xl p-8 shadow-xl ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-green-600">
              Secure checkout
            </p>

            <h1 className="mt-3 text-4xl font-bold">Checkout</h1>

            <p className={`mt-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Choose cash on delivery or pay by card.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`w-full rounded-2xl border p-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 ${
                  darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 bg-white"
                }`}
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className={`w-full rounded-2xl border p-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 ${
                  darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 bg-white"
                }`}
              />
            </div>

            <input
              type="text"
              placeholder="Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className={`w-full rounded-2xl border p-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 ${
                darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 bg-white"
              }`}
            />

            <div className={`rounded-2xl border p-4 ${darkMode ? "border-gray-700 bg-gray-700/30" : "border-gray-200 bg-gray-50"}`}>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
                Coupon code
              </p>

              <div className="flex flex-col gap-3 md:flex-row">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className={`flex-1 rounded-2xl border p-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 ${
                    darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 bg-white"
                  }`}
                />

                {appliedCoupon ? (
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="rounded-2xl border border-red-500 px-5 py-3 font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="rounded-2xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
                  >
                    Apply
                  </button>
                )}
              </div>

              <div className={`mt-3 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Available: {availableCoupons.length > 0 ? availableCoupons.map((coupon) => coupon.code).join(", ") : "No active coupons"}
              </div>

              {appliedCoupon && (
                <div className="mt-3 rounded-2xl bg-green-600/10 px-4 py-3 text-sm font-semibold text-green-700">
                  Applied {appliedCoupon.code} ({appliedCoupon.label})
                </div>
              )}
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
                Payment method
              </p>

              <div className="grid gap-3 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cash")}
                  className={`rounded-2xl border p-4 text-left transition ${
                    paymentMethod === "cash"
                      ? "border-green-600 bg-green-600/10"
                      : darkMode
                      ? "border-gray-700 bg-gray-700/40"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <span className="block text-lg font-bold">Cash on delivery</span>
                  <span className={`mt-1 block text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Pay when your groceries arrive.
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`rounded-2xl border p-4 text-left transition ${
                    paymentMethod === "card"
                      ? "border-green-600 bg-green-600/10"
                      : darkMode
                      ? "border-gray-700 bg-gray-700/40"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <span className="block text-lg font-bold">Visa / Mastercard</span>
                  <span className={`mt-1 block text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Pay securely by card now.
                  </span>
                </button>
              </div>
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-4 rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
                <div className="grid gap-4">
                  <input
                    type="text"
                    placeholder="Name on card"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required={paymentMethod === "card"}
                    className={`w-full rounded-2xl border p-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 ${
                      darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 bg-white"
                    }`}
                  />

                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Card number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    required={paymentMethod === "card"}
                    className={`w-full rounded-2xl border p-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 ${
                      darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 bg-white"
                    }`}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                      required={paymentMethod === "card"}
                      className={`w-full rounded-2xl border p-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 ${
                        darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 bg-white"
                      }`}
                    />

                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="CVV"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      required={paymentMethod === "card"}
                      className={`w-full rounded-2xl border p-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 ${
                        darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 bg-white"
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-2xl bg-green-600 py-4 font-semibold text-white transition hover:bg-green-700"
            >
              {paymentMethod === "card" ? "Pay now" : "Place order"}
            </button>
          </form>
        </div>

        <aside className={`h-fit rounded-3xl p-8 shadow-xl ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h2 className="text-2xl font-bold">Order summary</h2>

          <div className={`mt-6 space-y-4 rounded-2xl border p-5 ${darkMode ? "border-gray-700 bg-gray-900/50" : "border-gray-200 bg-gray-50"}`}>
            <div className="flex items-center justify-between text-sm">
              <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Items</span>
              <span className="font-semibold">{itemCount}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Delivery fee</span>
              <span className="font-semibold">{deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Coupon discount</span>
              <span className="font-semibold text-green-600">
                {discountAmount > 0 ? `- $${discountAmount.toFixed(2)}` : "$0.00"}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-dashed pt-4 text-lg font-bold">
              <span>Total</span>
              <span className="text-green-600">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className={`mt-6 rounded-2xl p-5 ${darkMode ? "bg-gray-900/50" : "bg-green-50"}`}>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
              Delivery info
            </p>

            <p className={`mt-3 text-sm leading-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Estimated delivery in about 2 hours. Cash orders are confirmed instantly, while card payments are processed securely.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Checkout;