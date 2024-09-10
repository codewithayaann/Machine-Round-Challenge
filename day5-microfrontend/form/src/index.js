import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

window.renderForm = (containerId, history, handler) => {
  const root = ReactDOM.createRoot(document.getElementById(containerId));
  root.render(<App {...{ handler, history }} />);
};

window.unmountForm = (containerId) => {
  const root = ReactDOM.createRoot(document.getElementById(containerId));
  root.unmount();
};

if (!document.getElementById("Form-container")) {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
}