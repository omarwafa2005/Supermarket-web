import {
  useState,
  useContext,
  useEffect,
} from "react";
import {
  useSearchParams,
} from "react-router-dom";
import products from "../../data/products";
import ProductCard from "../../components/ProductCard/ProductCard";
import { ThemeContext } from "../../context/ThemeContext";

const Products = () => {
  const { darkMode } =
    useContext(ThemeContext);

  const [searchParams] =
    useSearchParams();

  const query =
    searchParams.get("search") || "";

  const [search, setSearch] =
    useState(query);

  const [sortBy, setSortBy] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const [minPrice, setMinPrice] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  useEffect(() => {
    setSearch(query);
    setCurrentPage(1);
  }, [query]);

  let filteredProducts =
    products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        category === "All" ||
        product.category ===
          category;

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
      className={`max-w-7xl mx-auto py-16 px-6 transition-colors duration-300 ${
        darkMode
          ? "text-white"
          : "text-black"
      }`}
    >
      <h1 className="text-5xl font-bold text-center mb-12">
        All Products
      </h1>

      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(
              e.target.value
            );
            setCurrentPage(1);
          }}
          className={`w-full md:w-96 p-3 rounded-lg border ${
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
          className={`p-3 rounded-lg border ${
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
        {[
          "All",
          "Fruits",
          "Dairy",
          "Bakery",
          "Drinks",
        ].map((item) => (
          <button
            key={item}
            onClick={() => {
              setCategory(item);
              setCurrentPage(1);
            }}
            className={`px-5 py-2 rounded-lg transition ${
              category === item
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
          className={`p-3 rounded-lg border w-40 ${
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
          className={`p-3 rounded-lg border w-40 ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-300 text-black"
          }`}
        />
      </div>

      {/* Products */}
      {currentProducts.length ===
      0 ? (
        <h2 className="text-center text-2xl">
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