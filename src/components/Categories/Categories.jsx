import { Link } from "react-router-dom";

const Categories = () => {
  const categories = [
    {
      name: "Fruits",
      emoji: "🍎",
    },
    {
      name: "Dairy",
      emoji: "🥛",
    },
    {
      name: "Bakery",
      emoji: "🍞",
    },
    {
      name: "Drinks",
      emoji: "🧃",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      <h2 className="text-4xl font-bold text-center mb-10">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/products?category=${category.name}`}
            className="bg-white shadow rounded-xl p-8 text-center hover:shadow-xl transition"
          >
            <div className="text-5xl mb-4">
              {category.emoji}
            </div>

            <h3 className="text-2xl font-semibold">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;