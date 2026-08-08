import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-green-600">
        404
      </p>

      <h1 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
        Page not found
      </h1>

      <p className="mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-300">
        The page you are looking for does not exist or has been moved.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          Go home
        </Link>

        <Link
          to="/products"
          className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-green-600 hover:text-green-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-green-500 dark:hover:text-green-400"
        >
          Browse products
        </Link>
      </div>
    </section>
  );
};

export default NotFound;