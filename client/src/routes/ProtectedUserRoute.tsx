import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedUserRoute = ({ children }: { children: JSX.Element }) => {
  const { accessToken } = useContext(AuthContext);

  return accessToken ? children : <Navigate to="/" replace />;
};

export default ProtectedUserRoute;
