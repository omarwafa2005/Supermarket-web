import { FiShoppingCart, FiHeart, FiUser, FiSearch } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-3xl font-bold text-green-600">
          SuperMarket 🛒
        </h1>

        {/* Search */}
        <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 w-[350px]">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none px-2 w-full"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6 text-2xl">

          <FiHeart className="cursor-pointer hover:text-green-600" />

          <FiShoppingCart className="cursor-pointer hover:text-green-600" />

          <FiUser className="cursor-pointer hover:text-green-600" />

        </div>

      </div>
    </nav>
  );
};

export default Navbar;