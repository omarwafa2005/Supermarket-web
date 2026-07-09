import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { register } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = register(
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
        "Email already exists"
      );
    }
  };

  return (
    <section className="max-w-md mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold text-center mb-10">
        Register
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow"
      >
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
          className="w-full p-3 border rounded-lg mb-5"
        />

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
          Register
        </button>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600"
          >
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Register;