import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import ProductCard from "../ProductCard/ProductCard";
import { getProducts } from "../../utils/products";

const FeaturedProducts = () => {
  const { darkMode } =
    useContext(ThemeContext);
  const products = getProducts().slice(0, 4);

  return (
    <section
      className={`max-w-7xl mx-auto py-16 px-6 transition-colors duration-300 ${
        darkMode
          ? "text-white"
          : "text-black"
      }`}
    >
      <h2 className="text-4xl font-bold text-center mb-10">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;