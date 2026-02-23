import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {

  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;

  if (user.role !== 1) return <Navigate to="/" />;

  return children;
}

export default PrivateRoute;
