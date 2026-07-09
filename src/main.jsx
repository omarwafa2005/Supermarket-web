import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import "./style.css";

import CartProvider from "./context/CartContext";
import WishlistProvider from "./context/WishlistContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={2000}
          />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);