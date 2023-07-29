import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// contexts
import { CourseProvider } from "./contexts/CourseContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { StudyPlanProvider } from "./contexts/StudyPlanContext.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";
import { ConfigLogoProvider } from "./contexts/ConfigLogoContext.tsx";
import ToasterContext from "./contexts/ToastContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigLogoProvider>
        <AuthProvider>
          <UserProvider>
            <StudyPlanProvider>
              <CourseProvider>
                <ToasterContext />
                <App />
              </CourseProvider>
            </StudyPlanProvider>
          </UserProvider>
        </AuthProvider>
      </ConfigLogoProvider>
    </BrowserRouter>
  </React.StrictMode>
);
