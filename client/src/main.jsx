import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    {/* default cssbaseline default css p-0 m-0 applied  */}
    <CssBaseline />
    <App />
  </>
);
