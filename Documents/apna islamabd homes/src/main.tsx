import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router, queryClient } from "./router";
import "./styles.css";

const rootElement = document.getElementById("root");

if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} context={{ queryClient }} />
    </React.StrictMode>
  );
}
