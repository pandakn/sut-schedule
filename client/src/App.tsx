import { Routes, Route } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

// protected route
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import ProtectedUserRoute from "./routes/ProtectedUserRoute";

// components
import BlogPost from "./pages/blog/BlogPost";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// pages
import Login from "./pages/Login";
import RegisterForm from "./components/auth/RegisterForm";
import PostsOfUser from "./pages/blog/PostsOfUser";

// user pages
import SearchCourse from "./pages/SearchCourse";
import SchedulePage from "./pages/SchedulePage";
import UpdateBlog from "./pages/blog/UpdateBlog";

// admin pages
import AdminPage from "./pages/admin/AdminPage";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageBlogs from "./pages/admin/ManageBlogs";
import CreateBlog from "./pages/blog/CreateBlog";
import Homepage from "./pages/Homepage";
import BlogByTag from "./pages/blog/BlogByTag";

function App() {
  return (
    <>
      <Navbar />
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
        <Route
          path="/admin/manage-blogs"
          element={
            <ProtectedAdminRoute>
              <ManageBlogs />
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

        {/* guest */}
        <Route path="/" element={<Homepage />} />
        <Route path="/blogs/tag/:name" element={<BlogByTag />} />
        <Route path="/blog/:slug" element={<BlogPost />} />

        <Route
          path="/posts"
          element={
            <ProtectedUserRoute>
              <PostsOfUser />
            </ProtectedUserRoute>
          }
        />

        <Route
          path="/schedule"
          element={
            <ProtectedUserRoute>
              <SchedulePage />
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
          path="/edit-post/:slug"
          element={
            <ProtectedUserRoute>
              <UpdateBlog />
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

        {/* auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
