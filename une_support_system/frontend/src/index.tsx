import React from "react";
import ReactDOM from "react-dom/client";
import "./global.module.scss";
import { App } from "./components/App";

let root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
