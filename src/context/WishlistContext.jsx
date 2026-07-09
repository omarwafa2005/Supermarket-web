import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const toggleWishlist = (product) => {
    const exists = wishlist.find(
      (item) => item.id === product.id
    );

    if (exists) {
      setWishlist(
        wishlist.filter(
          (item) => item.id !== product.id
        )
      );

      toast.info(
        `${product.name} removed from wishlist`
      );
    } else {
      setWishlist([
        ...wishlist,
        product,
      ]);

      toast.success(
        `${product.name} added to wishlist`
      );
    }
  };

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;