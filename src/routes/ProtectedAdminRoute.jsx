import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedAdminRoute = ({ children }) => {
  const { user, loading } =
    useContext(AuthContext);

  if (loading) {
    return (
      <h1 className="text-center mt-20 text-3xl">
        Loading...
      </h1>
    );
  }

  // غير الإيميل ده بإيميلك
  const adminEmail =
    "omarwafs65@gmail.com";

  if (
    !user ||
    user.email !== adminEmail
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;