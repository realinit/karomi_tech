/* global document */

import "babel-polyfill";
import "isomorphic-fetch";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";

const DashboardContainer = Loadable({
  loader: () => import("./containers/RootContainers/DashboardContainer"),
  loading: function () {
    return null;
  },
});
const LoginContainer = Loadable({
  loader: () => import("./containers/LoginContainer"),
  loading: function () {
    return null;
  },
});

import configureStore from "./store/configureStore";

const { store } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path={"/login"} component={LoginContainer} />
        <DashboardContainer />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
