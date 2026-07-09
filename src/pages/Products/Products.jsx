import { useState, useContext } from "react";
import products from "../../data/products";
import ProductCard from "../../components/ProductCard/ProductCard";
import { ThemeContext } from "../../context/ThemeContext";

const Products = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  const { darkMode } =
    useContext(ThemeContext);

  let filteredProducts =
    products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  if (sortBy === "low") {
    filteredProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sortBy === "high") {
    filteredProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  if (sortBy === "az") {
    filteredProducts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (sortBy === "za") {
    filteredProducts.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

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

      <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className={`w-full md:w-96 p-3 rounded-lg border ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-300 text-black"
          }`}
        />

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map(
          (product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          )
        )}
      </div>
    </section>
  );
};

export default Products;