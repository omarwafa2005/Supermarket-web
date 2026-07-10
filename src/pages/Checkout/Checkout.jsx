import {
  useContext,
  useState,
} from "react";
import {
  useNavigate,
} from "react-router-dom";
import {
  CartContext,
} from "../../context/CartContext";
import {
  ThemeContext,
} from "../../context/ThemeContext";
import {
  toast,
} from "react-toastify";

const Checkout = () => {
  const { clearCart } =
    useContext(
      CartContext
    );

  const { darkMode } =
    useContext(
      ThemeContext
    );

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const handleSubmit = (
    e
  ) => {
    e.preventDefault();

    toast.success(
      "Order placed successfully!"
    );

    clearCart();

    navigate(
      "/success"
    );
  };

  return (
    <section
      className={`min-h-[80vh] flex items-center justify-center px-6 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <div
        className={`w-full max-w-lg p-8 rounded-2xl shadow-xl ${
          darkMode
            ? "bg-gray-800"
            : "bg-white"
        }`}
      >
        <h1 className="text-4xl font-bold text-center mb-8">
          Checkout
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5"
        >
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            required
            className={`w-full p-3 rounded-lg border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "border-gray-300"
            }`}
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
            required
            className={`w-full p-3 rounded-lg border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "border-gray-300"
            }`}
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            required
            className={`w-full p-3 rounded-lg border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "border-gray-300"
            }`}
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Place Order
          </button>
        </form>
      </div>
    </section>
  );
};

export default Checkout;