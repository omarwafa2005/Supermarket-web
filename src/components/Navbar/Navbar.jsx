import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const { wishlist } =
    useContext(WishlistContext);

  return (
    <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <Link
        to="/"
        className="text-3xl font-bold text-green-600"
      >
        SuperMarket 🛒
      </Link>

      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="text-lg font-medium hover:text-green-600"
        >
          Home
        </Link>

        <Link
          to="/products"
          className="text-lg font-medium hover:text-green-600"
        >
          Products
        </Link>

        {/* Wishlist */}
        <div className="relative">
          <Link
            to="/wishlist"
            className="text-3xl"
          >
            ❤️
          </Link>

          {wishlist.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </div>

        {/* Cart */}
        <div className="relative">
          <Link
            to="/cart"
            className="text-3xl"
          >
            🛒
          </Link>

          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;