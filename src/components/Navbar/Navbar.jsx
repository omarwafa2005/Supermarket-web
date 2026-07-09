import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { user, logout } = useContext(AuthContext);
  const { darkMode, setDarkMode } =
    useContext(ThemeContext);

  return (
    <nav
      className={`shadow px-8 py-4 flex justify-between items-center transition-colors duration-300 ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-black"
      }`}
    >
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

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="text-2xl"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="font-medium">
              Hi, {user.name}
            </span>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;