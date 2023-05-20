import { useAuth } from "../hooks/useAuth";
import LoginForm from "../components/LoginForm";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { accessToken } = useAuth();

  return <>{!accessToken ? <LoginForm /> : <Navigate to="/" />}</>;
};

export default Login;
