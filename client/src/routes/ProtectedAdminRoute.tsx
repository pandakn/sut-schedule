import Sidebar from "../components/admin/Sidebar";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }: { children: JSX.Element }) => {
  const { accessToken } = useAuth();
  const data = localStorage.getItem("payload");
  const user = data && JSON.parse(data);

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return accessToken ? (
    <div className="flex h-screen">
      <Sidebar />
      <main className="w-full p-6 ml-14 lg:ml-2">{children}</main>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedAdminRoute;
