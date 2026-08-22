import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SystemProvider } from "./context/SystemContext.tsx";

createRoot(document.getElementById("root")!).render(
  <SystemProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </SystemProvider>,
);
