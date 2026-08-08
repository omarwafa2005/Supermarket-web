import {
  useContext,
  useState,
} from "react";
import {
  useSearchParams,
} from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { ThemeContext } from "../../context/ThemeContext";
import {
  getProductCategories,
  getProducts,
} from "../../utils/products";

const Products = () => {
  const { darkMode } =
    useContext(ThemeContext);

  const [searchParams, setSearchParams] =
    useSearchParams();

  const query =
    searchParams.get("search") || "";

  const selectedCategory =
    searchParams.get("category") || "All";

  const [sortBy, setSortBy] =
    useState("");

  const [minPrice, setMinPrice] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [showFilters, setShowFilters] =
    useState(false);

  const activeSearch = query;
  const allProducts = getProducts();

  const setFilterParam = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);

    if (!value || value === "All") {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }

    setSearchParams(nextParams);
    setCurrentPage(1);
  };

  let filteredProducts =
    allProducts.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            activeSearch.toLowerCase()
          );

      const matchesCategory =
        selectedCategory === "All" ||
        product.category ===
          selectedCategory;

      const matchesMin =
        minPrice === "" ||
        product.price >=
          Number(minPrice);

      const matchesMax =
        maxPrice === "" ||
        product.price <=
          Number(maxPrice);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMin &&
        matchesMax
      );
    });

  if (sortBy === "low") {
    filteredProducts.sort(
      (a, b) =>
        a.price - b.price
    );
  }

  if (sortBy === "high") {
    filteredProducts.sort(
      (a, b) =>
        b.price - a.price
    );
  }

  if (sortBy === "az") {
    filteredProducts.sort((a, b) =>
      a.name.localeCompare(
        b.name
      )
    );
  }

  if (sortBy === "za") {
    filteredProducts.sort((a, b) =>
      b.name.localeCompare(
        a.name
      )
    );
  }

  const productsPerPage = 8;

  const lastProduct =
    currentPage * productsPerPage;

  const firstProduct =
    lastProduct -
    productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      firstProduct,
      lastProduct
    );

  const totalPages = Math.ceil(
    filteredProducts.length /
      productsPerPage
  );

  return (
    <section
      className={`mx-auto max-w-7xl px-6 py-16 transition-colors duration-300 ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-green-600">
          Browse fresh picks
        </p>

        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
          All Products
        </h1>

        <p className={`mt-4 text-base sm:text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Search, filter, and sort groceries with a cleaner shopping flow.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border px-4 py-4 shadow-sm backdrop-blur-sm transition-colors duration-300 md:px-6 dark:border-gray-800 dark:bg-gray-900/70 border-gray-200 bg-white/80">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-green-600">
            Search & sort
          </p>

          <p className={`mt-1 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {filteredProducts.length} products match your filters
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowFilters((current) => !current)}
          className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 md:hidden"
        >
          {showFilters ? "Hide filters" : "Show filters"}
        </button>
      </div>

      {/* Search + Sort */}
      <div className={`${showFilters ? "flex" : "hidden"} flex-col gap-4 mb-8 md:flex md:flex-row md:justify-center`}>
        <input
          type="text"
          placeholder="Search products or categories..."
          value={query}
          onChange={(e) => {
            const nextSearch = e.target.value;
            const nextParams = new URLSearchParams(searchParams);

            if (nextSearch) {
              nextParams.set("search", nextSearch);
            } else {
              nextParams.delete("search");
            }

            setSearchParams(nextParams);
            setCurrentPage(1);
          }}
          className={`w-full md:w-96 p-3 rounded-xl border shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-300 text-black"
          }`}
        />

        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(
              e.target.value
            );
            setCurrentPage(1);
          }}
          className={`p-3 rounded-xl border shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-300 text-black"
          }`}
        >
          <option value="">
            Sort By
          </option>

          <option value="low">
            Price: Low → High
          </option>

          <option value="high">
            Price: High → Low
          </option>

          <option value="az">
            Name: A → Z
          </option>

          <option value="za">
            Name: Z → A
          </option>
        </select>
      </div>

      {/* Categories */}
      <div className="flex justify-center gap-3 flex-wrap mb-8">
        {getProductCategories().map((item) => (
          <button
            key={item}
            onClick={() => {
              setFilterParam("category", item);
            }}
            className={`px-5 py-2 rounded-full transition ${
              selectedCategory === item
                ? "bg-green-600 text-white"
                : darkMode
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Price Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => {
            setMinPrice(
              e.target.value
            );
            setCurrentPage(1);
          }}
          className={`w-40 rounded-xl border p-3 shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-300 text-black"
          }`}
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(
              e.target.value
            );
            setCurrentPage(1);
          }}
          className={`w-40 rounded-xl border p-3 shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-300 text-black"
          }`}
        />
      </div>

      {/* Products */}
      {currentProducts.length ===
      0 ? (
        <h2 className="text-center text-2xl font-semibold">
          No products found.
        </h2>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              )
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-12 flex-wrap">
              {[
                ...Array(
                  totalPages
                ),
              ].map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setCurrentPage(
                        index + 1
                      )
                    }
                    className={`px-4 py-2 rounded-lg transition ${
                      currentPage ===
                      index + 1
                        ? "bg-green-600 text-white"
                        : darkMode
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-gray-300 text-black hover:bg-gray-400"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Products;