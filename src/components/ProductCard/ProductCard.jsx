import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { ThemeContext } from "../../context/ThemeContext";

const ProductCard = ({ product }) => {
  const { addToCart } =
    useContext(CartContext);

  const {
    wishlist,
    toggleWishlist,
  } = useContext(WishlistContext);

  const { darkMode } =
    useContext(ThemeContext);

  const isFavorite =
    wishlist.find(
      (item) =>
        item.id === product.id
    );

  return (
    <div
      className={`relative rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-black"
      }`}
    >
      <button
        onClick={() =>
          toggleWishlist(product)
        }
        className="absolute top-4 right-4 text-2xl"
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <Link
        to={`/products/${product.id}`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-52 w-full object-cover"
        />
      </Link>

      <div className="p-5">
        <h3 className="text-xl font-semibold">
          {product.name}
        </h3>

        <p
          className={
            darkMode
              ? "text-gray-300"
              : "text-gray-500"
          }
        >
          {product.category}
        </p>

        <div className="flex justify-between items-center mt-2">
          <p className="text-green-600 font-bold text-xl">
            ${product.price}
          </p>

          <span className="font-semibold">
            ⭐ {product.rating}
          </span>
        </div>

        <button
          onClick={() =>
            addToCart(product)
          }
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;