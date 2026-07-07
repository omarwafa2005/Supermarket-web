import { FaTruck, FaLeaf, FaCreditCard } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">
        Why Choose Us
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="shadow-lg rounded-xl p-8 text-center">
          <FaTruck className="text-5xl text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold">Fast Delivery</h3>
          <p className="mt-3 text-gray-600">
            Receive your groceries in less than one hour.
          </p>
        </div>

        <div className="shadow-lg rounded-xl p-8 text-center">
          <FaLeaf className="text-5xl text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold">Fresh Products</h3>
          <p className="mt-3 text-gray-600">
            100% fresh fruits, vegetables and dairy.
          </p>
        </div>

        <div className="shadow-lg rounded-xl p-8 text-center">
          <FaCreditCard className="text-5xl text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold">Secure Payment</h3>
          <p className="mt-3 text-gray-600">
            Safe online payments with multiple methods.
          </p>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;