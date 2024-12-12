import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import World from "./Bf.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <World />
  </StrictMode>
);
