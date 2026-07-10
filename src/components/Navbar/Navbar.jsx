import {
  useState,
  useContext,
} from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = () => {
  const { cartItems } =
    useContext(CartContext);

  const { wishlist } =
    useContext(WishlistContext);

  const { user, logout } =
    useContext(AuthContext);

  const {
    darkMode,
    setDarkMode,
  } = useContext(ThemeContext);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const navigate =
    useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(
      `/products?search=${search}`
    );

    setSearch("");
    setMenuOpen(false);
  };

  return (
    <nav
      className={`shadow px-6 py-4 transition-colors duration-300 ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
        <Link
          to="/"
          className="text-3xl font-bold text-green-600"
        >
          SuperMarket 🛒
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-md"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className={`w-full px-4 py-2 rounded-l-lg border outline-none ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 rounded-r-lg hover:bg-green-700"
          >
            🔍
          </button>
        </form>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/">
            Home
          </Link>

          <Link to="/products">
            Products
          </Link>

          <div className="relative">
            <Link
              to="/wishlist"
              className="text-3xl"
            >
              ❤️
            </Link>

            {wishlist.length >
              0 && (
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

            {cartItems.length >
              0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </div>

          <button
            onClick={() =>
              setDarkMode(
                !darkMode
              )
            }
            className="text-2xl"
          >
            {darkMode
              ? "☀️"
              : "🌙"}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <span>
                Hi, {user.name}
              </span>

              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() =>
            setMenuOpen(
              !menuOpen
            )
          }
          className="text-3xl md:hidden"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-5 flex flex-col gap-4">
          <form
            onSubmit={
              handleSearch
            }
            className="flex"
          >
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="flex-1 border p-2 rounded-l-lg text-black"
            />

            <button
              className="bg-green-600 text-white px-4 rounded-r-lg"
            >
              🔍
            </button>
          </form>

          <Link to="/">
            Home
          </Link>

          <Link to="/products">
            Products
          </Link>

          <Link to="/wishlist">
            Wishlist ❤️ (
            {wishlist.length})
          </Link>

          <Link to="/cart">
            Cart 🛒 (
            {cartItems.length})
          </Link>

          <button
            onClick={() =>
              setDarkMode(
                !darkMode
              )
            }
            className="text-2xl text-left"
          >
            {darkMode
              ? "☀️"
              : "🌙"}
          </button>

          {user ? (
            <button
              onClick={logout}
              className="bg-red-500 text-white py-2 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-green-600 text-white py-2 rounded-lg text-center"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;