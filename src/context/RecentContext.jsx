import {
  createContext,
  useState,
  useEffect,
} from "react";

export const RecentContext =
  createContext();

const RecentProvider = ({
  children,
}) => {
  const [recentProducts,
    setRecentProducts] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "recentProducts"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  const addRecentProduct =
    (product) => {
      setRecentProducts((prev) => {
        const filtered =
          prev.filter(
            (item) =>
              item.id !==
              product.id
          );

        return [
          product,
          ...filtered,
        ].slice(0, 6);
      });
    };

  useEffect(() => {
    localStorage.setItem(
      "recentProducts",
      JSON.stringify(
        recentProducts
      )
    );
  }, [recentProducts]);

  return (
    <RecentContext.Provider
      value={{
        recentProducts,
        addRecentProduct,
      }}
    >
      {children}
    </RecentContext.Provider>
  );
};

export default RecentProvider;