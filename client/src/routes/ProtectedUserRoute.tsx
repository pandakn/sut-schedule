import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedUserRoute = ({ children }: { children: JSX.Element }) => {
  const { accessToken } = useAuth();

  return accessToken ? <div>{children}</div> : <Navigate to="/" replace />;
};

export default ProtectedUserRoute;
