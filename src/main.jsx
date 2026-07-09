import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import "./style.css";

import CartProvider from "./context/CartContext";
import WishlistProvider from "./context/WishlistContext";
import AuthProvider from "./context/AuthContext";
import ThemeProvider from "./context/ThemeContext";
ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <BrowserRouter>
  <ThemeProvider>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={2000}
          />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </ThemeProvider>
</BrowserRouter>
);