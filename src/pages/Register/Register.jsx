import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { register } =
    useContext(AuthContext);

  const { darkMode } =
    useContext(ThemeContext);

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success =
      await register(
        name,
        email,
        password
      );

    if (success) {
      toast.success(
        "Account created successfully"
      );
      navigate("/");
    } else {
      toast.error(
        "Failed to create account"
      );
    }
  };

  return (
    <section
      className={`min-h-[80vh] flex items-center justify-center px-6 transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-2xl shadow-xl ${
          darkMode
            ? "bg-gray-800"
            : "bg-white"
        }`}
      >
        <h1 className="text-4xl font-bold text-center mb-8">
          📝 Register
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            required
            className={`w-full p-3 rounded-lg border mb-5 outline-none ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                : "bg-white text-black border-gray-300"
            }`}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
            className={`w-full p-3 rounded-lg border mb-5 outline-none ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                : "bg-white text-black border-gray-300"
            }`}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
            className={`w-full p-3 rounded-lg border mb-6 outline-none ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                : "bg-white text-black border-gray-300"
            }`}
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Register
          </button>

          <p
            className={`text-center mt-6 ${
              darkMode
                ? "text-gray-300"
                : "text-gray-600"
            }`}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;