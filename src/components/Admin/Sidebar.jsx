import { Link } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, ShieldCheck, Users, LogOut } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

  return (
    <aside className={`w-72 min-h-screen p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-slate-100 text-slate-900 border-r border-gray-200"}`}>

      <h1 className="text-3xl font-bold mb-12">
        Admin Panel
      </h1>

      <nav className="space-y-4">

        <Link
          to="/admin"
          className={`flex items-center gap-3 p-3 rounded-lg ${darkMode ? "hover:bg-gray-800" : "hover:bg-white"}`}
        >
          <LayoutDashboard size={22}/>
          Dashboard
        </Link>

        <Link
          to="/admin/products"
          className={`flex items-center gap-3 p-3 rounded-lg ${darkMode ? "hover:bg-gray-800" : "hover:bg-white"}`}
        >
          <Package size={22}/>
          Products
        </Link>

        <Link
          to="/admin/orders"
          className={`flex items-center gap-3 p-3 rounded-lg ${darkMode ? "hover:bg-gray-800" : "hover:bg-white"}`}
        >
          <ShoppingCart size={22}/>
          Orders
        </Link>

        <Link
          to="/admin/users"
          className={`flex items-center gap-3 p-3 rounded-lg ${darkMode ? "hover:bg-gray-800" : "hover:bg-white"}`}
        >
          <Users size={22}/>
          Users
        </Link>

        <Link
          to="/admin/admins"
          className={`flex items-center gap-3 p-3 rounded-lg ${darkMode ? "hover:bg-gray-800" : "hover:bg-white"}`}
        >
          <ShieldCheck size={22}/>
          Admins
        </Link>

        <button
          onClick={logout}
          className={`flex items-center gap-3 p-3 rounded-lg w-full text-left ${darkMode ? "hover:bg-red-600" : "hover:bg-red-50 text-red-600"}`}
        >
          <LogOut size={22}/>
          Logout
        </button>

      </nav>

    </aside>
  );
};

export default Sidebar;