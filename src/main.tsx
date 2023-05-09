import "./main.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import GameView from "./GameView";

const container = document.getElementById("root");
const root = createRoot(container as HTMLDivElement);

root.render(
  <StrictMode>
    <GameView />
  </StrictMode>
);
