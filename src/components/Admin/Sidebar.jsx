import { Link } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <aside className="w-72 bg-gray-900 text-white min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-12">
        Admin Panel
      </h1>

      <nav className="space-y-4">

        <Link
          to="/admin"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800"
        >
          <LayoutDashboard size={22}/>
          Dashboard
        </Link>

        <Link
          to="/admin/products"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800"
        >
          <Package size={22}/>
          Products
        </Link>

        <Link
          to="/admin/orders"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800"
        >
          <ShoppingCart size={22}/>
          Orders
        </Link>

        <Link
          to="/admin/users"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800"
        >
          <Users size={22}/>
          Users
        </Link>

        <button
          onClick={logout}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 w-full text-left"
        >
          <LogOut size={22}/>
          Logout
        </button>

      </nav>

    </aside>
  );
};

export default Sidebar;