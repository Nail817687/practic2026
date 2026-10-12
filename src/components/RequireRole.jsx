import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireRole({ role }) {
  let { user, loading } = useContext(AuthContext);
  let location = useLocation();

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!user.isLogged) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (user.role != role) {
    return <Navigate to="/forbidden" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
