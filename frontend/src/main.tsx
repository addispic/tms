import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import axios from "axios";

import { store } from "./store.ts";
import { BASE_URL } from "./config.ts";
import "./index.css";
import App from "./App.tsx";

// axios settings
axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
