import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "Cash",
  });

  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      Number(item.price) * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error(
        "Your cart is empty."
      );
      return;
    }

    toast.success(
      "Order placed successfully!"
    );

    navigate("/success");
  };

  return (
    <section className="max-w-6xl mx-auto py-16 px-6">
      <h1 className="text-5xl font-bold text-center mb-12">
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow"
        >
          <h2 className="text-2xl font-bold mb-6">
            Shipping Details
          </h2>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={
              handleChange
            }
            required
            className="w-full p-3 border rounded-lg mb-4"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={
              handleChange
            }
            required
            className="w-full p-3 border rounded-lg mb-4"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={
              handleChange
            }
            required
            className="w-full p-3 border rounded-lg mb-4"
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={
              handleChange
            }
            required
            className="w-full p-3 border rounded-lg mb-4"
          />

          <select
            name="paymentMethod"
            value={
              formData.paymentMethod
            }
            onChange={
              handleChange
            }
            className="w-full p-3 border rounded-lg mb-6"
          >
            <option value="Cash">
              Cash on Delivery
            </option>

            <option value="Card">
              Credit Card
            </option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Place Order
          </button>
        </form>

        <div className="bg-white p-8 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          {cartItems.map(
            (item) => (
              <div
                key={item.id}
                className="flex justify-between mb-4"
              >
                <span>
                  {item.name} x
                  {
                    item.quantity
                  }
                </span>

                <span>
                  $
                  {(
                    Number(
                      item.price
                    ) *
                    item.quantity
                  ).toFixed(
                    2
                  )}
                </span>
              </div>
            )
          )}

          <hr className="my-6" />

          <div className="flex justify-between text-2xl font-bold">
            <span>Total</span>
            <span>
              $
              {total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;