import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import useDarkMode from "./hooks/useDarkMode";

ReactDOM.render(
  <BrowserRouter>
    <div className="overflow-hidden">
      
      <App />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
