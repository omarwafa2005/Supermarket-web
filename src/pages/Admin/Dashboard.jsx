const Dashboard = () => {
  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      <h1 className="text-5xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-green-600 text-white rounded-xl p-6">
          <h2 className="text-xl">
            Products
          </h2>

          <p className="text-4xl font-bold mt-4">
            0
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-xl p-6">
          <h2 className="text-xl">
            Orders
          </h2>

          <p className="text-4xl font-bold mt-4">
            0
          </p>
        </div>

        <div className="bg-purple-600 text-white rounded-xl p-6">
          <h2 className="text-xl">
            Users
          </h2>

          <p className="text-4xl font-bold mt-4">
            0
          </p>
        </div>

        <div className="bg-red-600 text-white rounded-xl p-6">
          <h2 className="text-xl">
            Revenue
          </h2>

          <p className="text-4xl font-bold mt-4">
            $0
          </p>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;