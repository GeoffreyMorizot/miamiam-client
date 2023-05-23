import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const ProtectedRoutes = ({ allowedRoles }: { allowedRoles: number[] }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth || !auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.includes(auth.user.role_id)) {
    return <Outlet />;
  } else {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
};

export default ProtectedRoutes;
