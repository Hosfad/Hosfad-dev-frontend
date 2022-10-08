import React, { useRef } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <div className="overflow-hidden">
      <App></App>
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
