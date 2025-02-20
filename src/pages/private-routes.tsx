import { Navigate } from "react-router-dom";
import { useAuth } from "src/auth/user-context";

import OperationPage from "./projects/operation-page";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <OperationPage /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
