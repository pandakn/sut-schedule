import { useAuth } from "../hooks/useAuth";
import LoginForm from "../components/auth/LoginForm";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { accessToken } = useAuth();

  return <>{!accessToken ? <LoginForm /> : <Navigate to="/" />}</>;
};

export default Login;
