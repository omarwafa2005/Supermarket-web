import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { adminDashboardPath, isAdminUser } from "../../utils/admin";

const Footer = () => {
  const { user, adminEmails } = useContext(AuthContext);
  const showAdminLink = isAdminUser(user, adminEmails);

  return (
    <footer className="mt-20 border-t border-gray-200 bg-slate-950 text-white dark:border-gray-800">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        {/* Logo */}
        <div>
          <h2 className="text-3xl font-black tracking-tight text-green-500">
            SuperMarket 🛒
          </h2>

          <p className="mt-4 max-w-sm text-gray-400">
            Your one-stop shop for fresh groceries, dairy products, bakery items and more. Built for a faster and cleaner shopping flow.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-2xl font-bold">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="transition hover:text-green-500"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="transition hover:text-green-500"
            >
              Products
            </Link>

            <Link
              to="/my-orders"
              className="transition hover:text-green-500"
            >
              My Orders
            </Link>

            {showAdminLink && (
              <Link
                to={adminDashboardPath}
                className="transition hover:text-green-500"
              >
                Dashboard
              </Link>
            )}

            <Link
              to="/cart"
              className="transition hover:text-green-500"
            >
              Cart
            </Link>

            <Link
              to="/wishlist"
              className="transition hover:text-green-500"
            >
              Wishlist
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 text-2xl font-bold">
            Contact Us
          </h3>

          <p className="text-gray-400">
            📍 Cairo, Egypt
          </p>

          <p className="text-gray-400 mt-2">
            📧 info@supermarket.com
          </p>

          <p className="text-gray-400 mt-2">
            📞 +20 100 123 4567
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-gray-400">
        © 2026 SuperMarket. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;