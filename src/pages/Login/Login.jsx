import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(
      email,
      password
    );

    if (success) {
      toast.success(
        "Logged in successfully"
      );
      navigate("/");
    } else {
      toast.error(
        "Invalid email or password"
      );
    }
  };

  return (
    <section className="max-w-md mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold text-center mb-10">
        Login
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
          className="w-full p-3 border rounded-lg mb-5"
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
          className="w-full p-3 border rounded-lg mb-6"
        />

        <button
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Login
        </button>

        <p className="text-center mt-5">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-green-600"
          >
            Register
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;