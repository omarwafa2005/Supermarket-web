import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

const Hero = () => {
  const { darkMode } =
    useContext(ThemeContext);

  return (
    <section
      className={`relative overflow-hidden py-24 text-white transition-colors duration-300 md:py-32 ${
        darkMode
          ? "bg-gradient-to-r from-gray-900 to-gray-800"
          : "bg-gradient-to-r from-emerald-700 via-green-600 to-lime-600"
      }`}
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-black/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-white/80">
          Fresh groceries, faster delivery
        </p>

        <h1 className="mx-auto max-w-3xl text-4xl font-black leading-tight sm:text-5xl md:text-7xl">
          Fresh Groceries Delivered To Your Doorstep
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-white/90 sm:text-lg md:text-xl">
          Shop fresh fruits, dairy, bakery, drinks, and everyday essentials with a smoother, cleaner supermarket experience.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/products"
            className="rounded-full bg-white px-6 py-3 font-semibold text-green-700 transition hover:scale-[1.02]"
          >
            Shop now
          </Link>

          <Link
            to="/wishlist"
            className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            View wishlist
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;