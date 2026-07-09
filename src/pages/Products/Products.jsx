import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import products from "../../data/products";
import ProductCard from "../../components/ProductCard/ProductCard";

const Products = () => {
  const [searchParams] = useSearchParams();

  const initialCategory =
    searchParams.get("category") || "All";

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState(initialCategory);

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
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
          className="p-3 border rounded-lg w-full md:w-80"
        />

        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value)
          }
          className="p-3 border rounded-lg"
        >
          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <h2 className="text-center text-2xl">
          No products found.
        </h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;