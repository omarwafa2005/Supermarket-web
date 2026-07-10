import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* Logo */}
        <div>
          <h2 className="text-3xl font-bold text-green-500">
            SuperMarket 🛒
          </h2>

          <p className="mt-4 text-gray-400">
            Your one-stop shop for fresh groceries,
            dairy products, bakery items and more.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-bold mb-4">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="hover:text-green-500 transition"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="hover:text-green-500 transition"
            >
              Products
            </Link>

            <Link
              to="/cart"
              className="hover:text-green-500 transition"
            >
              Cart
            </Link>

            <Link
              to="/wishlist"
              className="hover:text-green-500 transition"
            >
              Wishlist
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-2xl font-bold mb-4">
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

      <div className="border-t border-gray-800 py-6 text-center text-gray-400">
        © 2026 SuperMarket. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;