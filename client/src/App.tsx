import { Routes, Route } from "react-router-dom";

// component
import Navbar from "./components/Navbar";

// protected route
import ProtectedUserRoute from "./routes/ProtectedUserRoute";

// pages
import Schedule from "./pages/Schedule";
import SearchCourse from "./pages/SearchCourse";
import Homepage from "./pages/Homepage";
// import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Homepage />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route
          path="schedule"
          element={
            <ProtectedUserRoute>
              <Schedule />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="search-course"
          element={
            <ProtectedUserRoute>
              <SearchCourse />
            </ProtectedUserRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
