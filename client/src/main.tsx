import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CourseProvider } from "./contexts/CourseContext.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <CourseProvider>
        <App />
      </CourseProvider>
    </BrowserRouter>
  </React.StrictMode>
);
