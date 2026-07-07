const OffersBanner = () => {
  return (
    <section className="bg-green-600 text-white py-16 mt-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">

        <div>
          <h2 className="text-5xl font-bold mb-4">
            Summer Sale 🛍️
          </h2>

          <p className="text-xl">
            Get up to 50% OFF on selected products.
          </p>
        </div>

        <button className="mt-8 md:mt-0 bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:scale-105 transition">
          Shop Now
        </button>

      </div>
    </section>
  );
};

export default OffersBanner;