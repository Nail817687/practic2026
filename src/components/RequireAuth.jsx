import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function RequireAuth() {
  let { user } = useContext(AuthContext);
  let location = useLocation();

  if (!user.isLogged) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
