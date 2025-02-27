import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { UserContextProvider } from "./context/usercontext";
import { BrowserRouter as Router } from "react-router-dom";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <Router>
  <UserContextProvider>
    <App />
  </UserContextProvider>
  </Router>
);
