import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { isAdminUser } from "../utils/admin";

const ProtectedAdminRoute = ({ children }) => {
  const { user, loading, adminEmails } =
    useContext(AuthContext);

  if (loading) {
    return (
      <h1 className="text-center mt-20 text-3xl">
        Loading...
      </h1>
    );
  }

  if (!isAdminUser(user, adminEmails)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;