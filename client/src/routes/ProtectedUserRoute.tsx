import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedUserRoute = ({ children }: { children: JSX.Element }) => {
  const { accessToken } = useAuth();

  return accessToken ? (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedUserRoute;
