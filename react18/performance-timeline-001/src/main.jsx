import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Example001 from "./Example001.jsx";
import Example002 from "./Example002.jsx";
import Example003 from "./Example003.jsx";
import Example004 from "./Example004.jsx";
import Example005 from "./Example005.jsx";

import React from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Example001 />
    <Example002 />
    <Example003 />
    <Example004 />
  </StrictMode>
);
