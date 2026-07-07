const categories = [
  "🥬 Vegetables",
  "🍎 Fruits",
  "🥛 Dairy",
  "🍞 Bakery",
  "🥩 Meat",
  "🥤 Drinks",
];

const Categories = () => {
  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      <h2 className="text-4xl font-bold mb-10 text-center">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category) => (
          <div
            key={category}
            className="bg-white rounded-xl shadow-md p-6 text-center cursor-pointer hover:shadow-xl hover:-translate-y-2 transition duration-300"
          >
            <h3 className="text-xl font-semibold">{category}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;