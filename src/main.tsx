import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";

ReactDOM.hydrateRoot(
  document.getElementById("root")!,
  <RouterProvider router={getRouter()} />
);
