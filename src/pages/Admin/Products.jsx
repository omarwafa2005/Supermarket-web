import { useContext, useMemo, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../utils/products";

const emptyForm = {
  name: "",
  category: "Fruits",
  price: "",
  rating: "4.5",
  image: "",
};

const Products = () => {
  const { darkMode } = useContext(ThemeContext);
  const [products, setProducts] = useState(() => getProducts());
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const refreshProducts = (nextProducts) => {
    setProducts(nextProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      rating: Number(form.rating),
      image: form.image.trim(),
    };

    if (
      !payload.name ||
      !payload.category ||
      !payload.image ||
      Number.isNaN(payload.price) ||
      Number.isNaN(payload.rating)
    ) {
      return;
    }

    const nextProducts = editingId
      ? updateProduct(editingId, payload)
      : addProduct(payload);

    refreshProducts(nextProducts);
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      rating: String(product.rating),
      image: product.image,
    });
  };

  const handleDelete = (productId) => {
    const nextProducts = deleteProduct(productId);
    refreshProducts(nextProducts);

    if (editingId === productId) {
      setEditingId(null);
      setForm(emptyForm);
    }
  };

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return products;
    }

    return products.filter((product) =>
      `${product.name} ${product.category}`.toLowerCase().includes(query)
    );
  }, [products, search]);

  return (
    <section className={darkMode ? "text-white" : "text-black"}>
      <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-green-600">
            Catalog management
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            Products
          </h1>
        </div>

        <p className={`max-w-xl text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          Add, edit, and remove catalog items. Changes appear in the storefront immediately.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className={`mb-8 grid gap-4 rounded-3xl border p-6 shadow-sm lg:grid-cols-5 ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}
      >
        <input
          type="text"
          placeholder="Product name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={`rounded-2xl border px-4 py-3 outline-none lg:col-span-2 ${darkMode ? "border-gray-700 bg-gray-800 text-white" : "border-gray-300 bg-white"}`}
        />

        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className={`rounded-2xl border px-4 py-3 outline-none ${darkMode ? "border-gray-700 bg-gray-800 text-white" : "border-gray-300 bg-white"}`}
        >
          <option value="Fruits">Fruits</option>
          <option value="Dairy">Dairy</option>
          <option value="Bakery">Bakery</option>
          <option value="Drinks">Drinks</option>
          <option value="Frozen">Frozen</option>
          <option value="Snacks">Snacks</option>
        </select>

        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className={`rounded-2xl border px-4 py-3 outline-none ${darkMode ? "border-gray-700 bg-gray-800 text-white" : "border-gray-300 bg-white"}`}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className={`rounded-2xl border px-4 py-3 outline-none lg:col-span-2 ${darkMode ? "border-gray-700 bg-gray-800 text-white" : "border-gray-300 bg-white"}`}
        />

        <input
          type="number"
          step="0.1"
          min="0"
          max="5"
          placeholder="Rating"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
          className={`rounded-2xl border px-4 py-3 outline-none ${darkMode ? "border-gray-700 bg-gray-800 text-white" : "border-gray-300 bg-white"}`}
        />

        <div className="flex flex-wrap gap-3 lg:col-span-5">
          <button type="submit" className="rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700">
            {editingId ? "Update product" : "Add product"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
              className={`rounded-full border px-6 py-3 font-semibold transition ${darkMode ? "border-gray-700 hover:border-green-600 hover:text-green-400" : "border-gray-300 hover:border-green-600 hover:text-green-600"}`}
            >
              Cancel edit
            </button>
          )}
        </div>
      </form>

      <div className={`mb-6 flex flex-col gap-3 rounded-2xl border px-4 py-4 shadow-sm md:flex-row md:items-center md:justify-between ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
        <div>
          <p className="text-sm font-semibold text-green-600">Live catalog</p>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Showing {filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"}
          </p>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products"
          className={`w-full rounded-2xl border px-4 py-3 outline-none md:max-w-xs ${darkMode ? "border-gray-700 bg-gray-800 text-white" : "border-gray-300 bg-white"}`}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className={`rounded-2xl border border-dashed p-8 text-center ${darkMode ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"}`}>
          No products match your search.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <article key={product.id} className={`overflow-hidden rounded-3xl border shadow-sm ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
              <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold">{product.name}</h2>
                    <p className={`mt-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {product.category}
                    </p>
                  </div>

                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-600">
                    ${Number(product.price).toFixed(2)}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    Rating: {product.rating}
                  </span>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(product)}
                      className="rounded-full border border-green-600 px-4 py-2 text-sm font-semibold text-green-600 transition hover:bg-green-600 hover:text-white"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(product.id)}
                      className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;