import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { ROUTE_DEFINITIONS } from "@/routes";
import "./index.css";
import "jotai-devtools/styles.css";
import "@/index.css";

const router = createHashRouter(ROUTE_DEFINITIONS);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RouterProvider fallbackElement={<div>fallback</div>} router={router} />
  </StrictMode>,
);
