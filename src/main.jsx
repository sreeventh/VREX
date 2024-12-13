import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import World from "./Starter.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <World />
  </StrictMode>
);
