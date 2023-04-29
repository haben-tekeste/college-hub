import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// import "mdb-react-ui-kit/dist/css/mdb.min.css";

// global styles
import GlobalStyles from "./styles/GlobalStyles";

// react router
import { BrowserRouter } from "react-router-dom";

// redux
import { Provider } from "react-redux";
import { store } from "./states/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
