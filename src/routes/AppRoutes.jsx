import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedAdminRoute from "./ProtectedAdminRoute";

const Home = lazy(() => import("../pages/Home/Home"));
const Products = lazy(() => import("../pages/Products/Products"));
const ProductDetails = lazy(() =>
  import("../pages/ProductDetails/ProductDetails")
);
const Cart = lazy(() => import("../pages/Cart/Cart"));
const Wishlist = lazy(() => import("../pages/Wishlist/Wishlist"));
const Checkout = lazy(() => import("../pages/Checkout/Checkout"));
const Success = lazy(() => import("../pages/Success/Success"));
const MyOrders = lazy(() => import("../pages/Orders/MyOrders"));
const OrderDetails = lazy(() => import("../pages/Orders/OrderDetails"));
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const Dashboard = lazy(() => import("../pages/Admin/Dashboard"));
const AdminProducts = lazy(() => import("../pages/Admin/Products"));
const Orders = lazy(() => import("../pages/Admin/Orders"));
const Users = lazy(() => import("../pages/Admin/Users"));
const AdminAccess = lazy(() => import("../pages/Admin/AdminAccess"));
const Coupons = lazy(() => import("../pages/Admin/Coupons"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center px-6">
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-4 text-sm font-medium text-gray-600 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
            Loading page...
          </div>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route path="/cart" element={<Cart />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/success" element={<Success />} />

        <Route path="/my-orders" element={<MyOrders />} />

        <Route path="/orders/:orderId" element={<OrderDetails />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="products" element={<AdminProducts />} />

          <Route path="orders" element={<Orders />} />

          <Route path="users" element={<Users />} />

          <Route path="admins" element={<AdminAccess />} />

          <Route path="coupons" element={<Coupons />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;