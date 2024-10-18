import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { EmailProvider } from "./context/EmailContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <EmailProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </EmailProvider>
  </StrictMode>
);
