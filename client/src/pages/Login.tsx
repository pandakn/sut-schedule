import { useContext } from "react";
import LoginForm from "../components/LoginForm";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { accessToken } = useContext(AuthContext);

  return <>{!accessToken ? <LoginForm /> : <Navigate to="/" />}</>;
};

export default Login;
