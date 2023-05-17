import { Routes, Route } from "react-router-dom";

// component
import Navbar from "./components/Navbar";

// pages
import Schedule from "./pages/Schedule";
import SearchCourse from "./pages/SearchCourse";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Homepage />} />
        <Route index path="schedule" element={<Schedule />} />
        <Route path="search-course" element={<SearchCourse />} />
      </Route>
    </Routes>
  );
}

export default App;
