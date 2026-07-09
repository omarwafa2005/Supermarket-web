import { useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const { darkMode } =
    useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;