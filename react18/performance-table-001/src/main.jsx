import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import React from "react";

import App001 from "./App001.jsx";
import App003 from "./App003.jsx";
import Example002 from "./Example002.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App001 />
    <App003 />
    <Example002 />
  </StrictMode>
);
