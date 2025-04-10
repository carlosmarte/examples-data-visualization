import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app";
import Table from "./table";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <Table />
  </StrictMode>
);
