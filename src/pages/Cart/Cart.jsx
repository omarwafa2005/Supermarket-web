import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      parseFloat(
        String(item.price).replace("$", "")
      ) *
        item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-xl">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border p-4 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />

                  <div>
                    <h2 className="text-xl font-bold">
                      {item.name}
                    </h2>

                    <p className="text-green-600 font-semibold">
                      {item.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    -
                  </button>

                  <span className="text-xl font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() =>
                      removeItem(item.id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-right">
            <h2 className="text-3xl font-bold">
              Total: ${total.toFixed(2)}
            </h2>

            <Link
              to="/checkout"
              className="inline-block mt-6 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;