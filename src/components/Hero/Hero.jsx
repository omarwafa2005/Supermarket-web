import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Hero = () => {
  const { darkMode } =
    useContext(ThemeContext);

  return (
    <section
      className={`h-[500px] flex items-center justify-center text-white transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-r from-gray-900 to-gray-800"
          : "bg-green-600"
      }`}
    >
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-6">
          Fresh Groceries Delivered
        </h1>

        <p className="text-xl">
          Shop fresh fruits,
          vegetables and daily
          essentials.
        </p>
      </div>
    </section>
  );
};

export default Hero;