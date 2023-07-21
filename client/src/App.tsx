import { Routes, Route } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

// protected route
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import ProtectedUserRoute from "./routes/ProtectedUserRoute";

// components
import BlogPost from "./components/blog/BlogPost";

// pages
import Login from "./pages/Login";
import RegisterForm from "./components/auth/RegisterForm";

// user pages
import SearchCourse from "./pages/SearchCourse";
import Homepage from "./pages/Homepage";

// admin pages
import AdminPage from "./pages/admin/AdminPage";
import ManageUsers from "./pages/admin/ManageUsers";
import Blog from "./pages/blog/Blog";
import CreateBlog from "./pages/blog/CreateBlog";

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
          path="/blogs"
          element={
            <ProtectedUserRoute>
              <Blog />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <ProtectedUserRoute>
              <BlogPost />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/blogs"
          element={
            <ProtectedUserRoute>
              <Blog />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/editor"
          element={
            <ProtectedUserRoute>
              <CreateBlog />
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
