import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Example001 from "./Example001.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Example001 />
  </StrictMode>
);
