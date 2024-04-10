import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/index";
import { Provider } from "react-redux";

import ShopContextProvider from "./components/shopcontext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ShopContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ShopContextProvider>
  </React.StrictMode>
);
