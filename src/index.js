import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TransactionProvider } from "./components/ReactContext/TransactionContext";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <TransactionProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </TransactionProvider>
  </>
);
