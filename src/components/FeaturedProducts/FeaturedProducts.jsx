const products = [
  {
    id: 1,
    name: "Fresh Apples",
    price: "$4.99",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400",
  },
  {
    id: 2,
    name: "Fresh Milk",
    price: "$2.50",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400",
  },
  {
    id: 3,
    name: "Bread",
    price: "$1.80",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
  },
  {
    id: 4,
    name: "Orange Juice",
    price: "$3.25",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd5bba3f?w=400",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      <h2 className="text-4xl font-bold text-center mb-10">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-52 w-full object-cover"
            />

            <div className="p-5">
              <h3 className="text-xl font-semibold">
                {product.name}
              </h3>

              <p className="text-green-600 text-lg font-bold mt-2">
                {product.price}
              </p>

              <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;