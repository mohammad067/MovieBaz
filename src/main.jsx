import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SpeedInsights } from "@vercel/speed-insights/react"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SpeedInsights/>
    <GoogleOAuthProvider clientId="49821893537-mrejbbmio5o04sphlp39hn9qdh968nut.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
);
