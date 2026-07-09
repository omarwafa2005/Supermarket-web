import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const { wishlist, toggleWishlist } =
    useContext(WishlistContext);

  const isFavorite = wishlist.find(
    (item) => item.id === product.id
  );

  return (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3 text-3xl z-10"
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      {/* Product Image */}
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="h-52 w-full object-cover"
        />
      </Link>

      {/* Product Info */}
      <div className="p-5">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-xl font-semibold hover:text-green-600 transition">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-500">
          {product.category}
        </p>

        <p className="text-green-600 font-bold text-xl mt-2">
          ${product.price}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;