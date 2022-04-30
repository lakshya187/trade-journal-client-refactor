import ReactDom from "react-dom";
import React from "react";
import App from "./components/app";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import { persistStore } from "redux-persist";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.querySelector("#root")
);
