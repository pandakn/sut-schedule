import { Routes, Route } from "react-router-dom";

// component
import Navbar from "./components/Navbar";

// protected route
import ProtectedUserRoute from "./routes/ProtectedUserRoute";

// pages
import Schedule from "./pages/Schedule";
import SearchCourse from "./pages/SearchCourse";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedUserRoute>
              <Homepage />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <ProtectedUserRoute>
              <Schedule />
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
