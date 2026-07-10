import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext =
  createContext();

const CartProvider = ({
  children,
}) => {
  const [cartItems, setCartItems] =
    useState(() => {
      const savedCart =
        localStorage.getItem(
          "cart"
        );

      return savedCart
        ? JSON.parse(
            savedCart
          )
        : [];
    });

  const addToCart = (
    product
  ) => {
    toast.success(
      `${product.name} added to cart`
    );

    setCartItems(
      (prev) => {
        const exist =
          prev.find(
            (item) =>
              item.id ===
              product.id
          );

        if (exist) {
          return prev.map(
            (item) =>
              item.id ===
              product.id
                ? {
                    ...item,
                    quantity:
                      item.quantity +
                      1,
                  }
                : item
          );
        }

        return [
          ...prev,
          {
            ...product,
            quantity: 1,
          },
        ];
      }
    );
  };

  const increaseQuantity = (
    id
  ) => {
    setCartItems(
      (prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity +
                  1,
              }
            : item
        )
    );
  };

  const decreaseQuantity = (
    id
  ) => {
    setCartItems(
      (prev) =>
        prev
          .map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity:
                    item.quantity -
                    1,
                }
              : item
          )
          .filter(
            (item) =>
              item.quantity >
              0
          )
    );
  };

  const removeItem = (
    id
  ) => {
    setCartItems(
      (prev) =>
        prev.filter(
          (item) =>
            item.id !== id
        )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(
        cartItems
      )
    );
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;