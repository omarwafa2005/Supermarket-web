import { Link } from "react-router-dom";

const Success = () => {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl mb-6">
        ✅
      </h1>

      <h2 className="text-4xl font-bold mb-4">
        Order Placed Successfully!
      </h2>

      <p className="text-xl text-gray-500 mb-8">
        Thank you for shopping
        with us.
      </p>

      <Link
        to="/products"
        className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition"
      >
        Continue Shopping
      </Link>
    </section>
  );
};

export default Success;