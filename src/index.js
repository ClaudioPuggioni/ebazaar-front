import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./components/Main";
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root"));

// eslint-disable-next-line
const errorMessageInterceptor = axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    error.message = error.response.data.error;
    return Promise.reject(error);
  }
);

root.render(
  <Router>
    <Provider store={store}>
      <Main />
    </Provider>
  </Router>
);
