const Products = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Products
      </h1>

      <button className="bg-green-600 text-white px-6 py-3 rounded-lg mb-6">
        + Add Product
      </button>

      <div className="bg-white rounded-xl shadow p-6">
        No products yet
      </div>
    </div>
  );
};

export default Products;