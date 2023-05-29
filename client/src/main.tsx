import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// contexts
import { CourseProvider } from "./contexts/CourseContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { StudyPlanProvider } from "./contexts/StudyPlanContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <StudyPlanProvider>
          <CourseProvider>
            <App />
          </CourseProvider>
        </StudyPlanProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
