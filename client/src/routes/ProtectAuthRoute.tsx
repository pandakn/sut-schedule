import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedAuthRoute = ({ children }: { children: JSX.Element }) => {
  const { forgotPasswordMsg, accessToken } = useAuth();

  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  return forgotPasswordMsg.email ? (
    <div>{children}</div>
  ) : (
    <Navigate to="/forgot-password" replace />
  );
};

export default ProtectedAuthRoute;
