import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Example002 from "./Example002.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Example002 />
  </StrictMode>
);
