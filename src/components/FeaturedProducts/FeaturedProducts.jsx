import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import ProductCard from "../ProductCard/ProductCard";

const products = [
  {
    id: 1,
    name: "Fresh Apples",
    price: 4.99,
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400",
    category: "Fruits",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Fresh Milk",
    price: 2.5,
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400",
    category: "Dairy",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Bread",
    price: 1.8,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
    category: "Bakery",
    rating: 4.8,
  },
  {
    id: 4,
    name: "Orange Juice",
    price: 3.25,
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd5bba3f?w=400",
    category: "Drinks",
    rating: 4.9,
  },
];

const FeaturedProducts = () => {
  const { darkMode } =
    useContext(ThemeContext);

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