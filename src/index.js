import React from "react";
import { createRoot } from 'react-dom/client';
//import ReactDOM from "react-dom";
import App from "./App";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  //document.getElementById("root")
);


