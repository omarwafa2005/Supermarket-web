import { Link } from "react-router-dom";

const Success = () => {
  return (
    <section className="max-w-3xl mx-auto text-center py-24 px-6">
      <h1 className="text-6xl mb-6">
        🎉
      </h1>

      <h2 className="text-5xl font-bold mb-6">
        Order Placed!
      </h2>

      <p className="text-xl text-gray-600 mb-10">
        Thank you for your order.
        Your products will be
        delivered soon.
      </p>

      <Link
        to="/products"
        className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition"
      >
        Continue Shopping
      </Link>
    </section>
  );
};

export default Success;