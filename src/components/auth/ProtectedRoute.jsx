import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../common/Loader";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const token = sessionStorage.getItem("token");


  if (loading) return <Loader />;

  if (!token)
    return <Navigate to="/auth/login" state={{ from: location }} replace />;

  if (!isAuthenticated)
    return <Navigate to="/auth/login" state={{ from: location }} replace />;

  return children;
};

export default ProtectedRoute;
