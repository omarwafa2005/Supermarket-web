import { Routes, Route } from "react-router-dom";

import AdminProducts from "../pages/Admin/Products";
import Orders from "../pages/Admin/Orders";
import Users from "../pages/Admin/Users";
import AdminLayout from "../layouts/AdminLayout";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Cart from "../pages/Cart/Cart";
import Wishlist from "../pages/Wishlist/Wishlist";
import Checkout from "../pages/Checkout/Checkout";
import Success from "../pages/Success/Success";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

import Dashboard from "../pages/Admin/Dashboard";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/products"
        element={<Products />}
      />

      <Route
        path="/products/:id"
        element={<ProductDetails />}
      />

      <Route
        path="/cart"
        element={<Cart />}
      />

      <Route
        path="/wishlist"
        element={<Wishlist />}
      />

      <Route
        path="/checkout"
        element={<Checkout />}
      />

      <Route
        path="/success"
        element={<Success />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
  path="/admin"
  element={
    <ProtectedAdminRoute>
      <AdminLayout />
    </ProtectedAdminRoute>
  }
>
  <Route
    index
    element={<Dashboard />}
  />

  <Route
    path="products"
    element={<AdminProducts />}
  />

  <Route
    path="orders"
    element={<Orders />}
  />

  <Route
    path="users"
    element={<Users />}
  />
</Route>

    </Routes>
  );
};

export default AppRoutes;