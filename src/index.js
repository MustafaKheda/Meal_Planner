import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store, { persistor } from "./Store/index";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
const basename =
  process.env.NODE_ENV === "production" ? process.env.PUBLIC_URL : "/";

root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
