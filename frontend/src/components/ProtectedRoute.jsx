import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // not logged in
  if (!token) {
    return <Navigate to="/auth?mode=login" />;
  }

  // role mismatch
  if (role && userRole !== role) {
    return <Navigate to="/auth?mode=login" />;
  }

  return children;
};

export default ProtectedRoute;
