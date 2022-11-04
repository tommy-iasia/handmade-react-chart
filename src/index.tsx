import { StrictMode } from "react";
import { render } from "react-dom";
import { Demo } from "./demos/Demo";
import "./index.css";

render(
  <StrictMode>
    <Demo />
  </StrictMode>,
  document.getElementById("root")
);
