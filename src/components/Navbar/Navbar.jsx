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
import { adminDashboardPath, isAdminUser } from "../../utils/admin";

const Navbar = () => {
  const { cartItems } =
    useContext(CartContext);

  const { wishlist } =
    useContext(WishlistContext);

  const { user, logout, adminEmails } =
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

  const showAdminLink = isAdminUser(user, adminEmails);

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-50 border-b px-6 py-4 backdrop-blur transition-colors duration-300 ${
        darkMode
          ? "border-gray-800 bg-gray-900/90 text-white"
          : "border-gray-200 bg-white/90 text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
        <Link
          to="/"
          className="text-2xl font-black tracking-tight text-green-600 md:text-3xl"
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
            className={`w-full rounded-l-full border px-4 py-2 outline-none transition focus:border-green-500 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          />

          <button
            type="submit"
            className="rounded-r-full bg-green-600 px-4 text-white transition hover:bg-green-700"
          >
            🔍
          </button>
        </form>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium">
          <Link to="/" className="transition hover:text-green-600">
            Home
          </Link>

          <Link to="/products" className="transition hover:text-green-600">
            Products
          </Link>

          <Link to="/my-orders" className="transition hover:text-green-600">
            My Orders
          </Link>

          {showAdminLink && (
            <Link to={adminDashboardPath} className="rounded-full border border-green-600 px-4 py-2 text-green-600 transition hover:bg-green-600 hover:text-white">
              Dashboard
            </Link>
          )}

          <div className="relative">
            <Link
              to="/wishlist"
              className="text-2xl transition hover:scale-105"
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
              className="text-2xl transition hover:scale-105"
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
            className="rounded-full border border-transparent px-3 py-2 text-xl transition hover:border-gray-300 hover:bg-black/5 dark:hover:border-gray-700 dark:hover:bg-white/5"
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
                className="rounded-full bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
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
        <div className={`md:hidden mt-5 flex flex-col gap-4 rounded-2xl border p-4 shadow-sm ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
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
              className="flex-1 rounded-l-full border p-2 text-black outline-none"
            />

            <button
              className="rounded-r-full bg-green-600 px-4 text-white"
            >
              🔍
            </button>
          </form>

          <Link to="/" onClick={closeMobileMenu} className="rounded-lg px-3 py-2 transition hover:bg-black/5 dark:hover:bg-white/5">
            Home
          </Link>

          <Link to="/products" onClick={closeMobileMenu} className="rounded-lg px-3 py-2 transition hover:bg-black/5 dark:hover:bg-white/5">
            Products
          </Link>

          <Link to="/my-orders" onClick={closeMobileMenu} className="rounded-lg px-3 py-2 transition hover:bg-black/5 dark:hover:bg-white/5">
            My Orders
          </Link>

          {showAdminLink && (
            <Link to={adminDashboardPath} onClick={closeMobileMenu} className="rounded-lg px-3 py-2 font-semibold text-green-600 transition hover:bg-black/5 dark:hover:bg-white/5">
              Dashboard
            </Link>
          )}

          <Link to="/wishlist" onClick={closeMobileMenu} className="rounded-lg px-3 py-2 transition hover:bg-black/5 dark:hover:bg-white/5">
            Wishlist ❤️ (
            {wishlist.length})
          </Link>

          <Link to="/cart" onClick={closeMobileMenu} className="rounded-lg px-3 py-2 transition hover:bg-black/5 dark:hover:bg-white/5">
            Cart 🛒 (
            {cartItems.length})
          </Link>

          <button
            onClick={() =>
              setDarkMode(
                !darkMode
              )
            }
            className="rounded-lg px-3 py-2 text-left text-xl transition hover:bg-black/5 dark:hover:bg-white/5"
          >
            {darkMode
              ? "☀️"
              : "🌙"}
          </button>

          {user ? (
            <button
              onClick={() => {
                logout();
                closeMobileMenu();
              }}
              className="rounded-full bg-red-500 py-2 text-white transition hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={closeMobileMenu}
              className="rounded-full bg-green-600 py-2 text-center text-white transition hover:bg-green-700"
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