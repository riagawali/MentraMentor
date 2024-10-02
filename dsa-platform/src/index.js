import React from "react";
import ReactDOM from "react-dom/client"; // Updated for React 18
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Ensure BrowserRouter is wrapping your App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
