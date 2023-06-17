import { Routes, Route } from "react-router-dom";

// component
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";

// protected route
import ProtectedUserRoute from "./routes/ProtectedUserRoute";

// pages
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
      <Footer />
    </>
  );
}

export default App;
