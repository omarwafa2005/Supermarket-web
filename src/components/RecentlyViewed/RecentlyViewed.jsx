import { useContext } from "react";
import { Link } from "react-router-dom";
import { RecentContext } from "../../context/RecentContext";
import { ThemeContext } from "../../context/ThemeContext";

const RecentlyViewed = () => {
  const { recentProducts } =
    useContext(RecentContext);

  const { darkMode } =
    useContext(ThemeContext);

  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto mt-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-10">
        Recently Viewed
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {recentProducts.map(
          (product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className={`rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 ${
                darkMode
                  ? "bg-gray-800 text-white"
                  : "bg-white text-black"
              }`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-bold">
                  {product.name}
                </h3>

                <p
                  className={`mt-1 ${
                    darkMode
                      ? "text-gray-300"
                      : "text-gray-500"
                  }`}
                >
                  {product.category}
                </p>

                <div className="flex justify-between items-center mt-3">
                  <p className="text-green-600 text-xl font-bold">
                    ${product.price}
                  </p>

                  <span className="font-semibold">
                    ⭐ {product.rating}
                  </span>
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </section>
  );
};

export default RecentlyViewed;