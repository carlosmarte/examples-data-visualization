import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Example001 from "./Example001.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Example001 />
  </StrictMode>
);
