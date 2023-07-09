import { Routes, Route } from "react-router-dom";

// protected route
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import ProtectedUserRoute from "./routes/ProtectedUserRoute";

// pages
import Login from "./pages/Login";
import RegisterForm from "./components/auth/RegisterForm";

// user pages
import SearchCourse from "./pages/SearchCourse";
import Homepage from "./pages/Homepage";

// admin pages
import AdminPage from "./pages/admin/AdminPage";
import ManageUsers from "./pages/admin/ManageUsers";

function App() {
  return (
    <>
      <Routes>
        {/* admin */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/manage-users"
          element={
            <ProtectedAdminRoute>
              <ManageUsers />
            </ProtectedAdminRoute>
          }
        />

        {/* user */}
        <Route
          path="/"
          element={
            <ProtectedUserRoute>
              <Homepage />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/search-course"
          element={
            <ProtectedUserRoute>
              <SearchCourse />
            </ProtectedUserRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </>
  );
}

export default App;
