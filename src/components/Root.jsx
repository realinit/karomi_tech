import PropTypes from "prop-types";
import React, { Component } from "react";
import messageBus from "utils/messageBus";
import ActionTypes from "constants/ActionTypes";

//  import Router from '../components/Router.jsx';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { browserHistory } from "react-router";
import MasterLayout from "shared/layout/masterLayout";
import config from "config";
import Error from "../components/Error/404";
import ErrorBoundary from "../components/Error/ErrorBoundary";
import utility from "./../utils/utility";

const propTypes = {
  initEnvironment: PropTypes.func.isRequired,
  paths: PropTypes.arrayOf(PropTypes.string).isRequired,
  router: PropTypes.shape({
    keys: PropTypes.shape({}),
    options: PropTypes.shape({}),
    path: PropTypes.string,
  }).isRequired,
  routes: PropTypes.shape({}).isRequired,
};

class Root extends Component {
  componentDidMount() {
    const {
      initEnvironment,
      paths,
      initRouter,
    } = this.props;
    initEnvironment();
    initRouter(paths);
  }

  render() {
    const { routes, paths, isLoggedIn, } = this.props;
    let path;
    const pathArr = window.location.pathname.split("/") || "";
    if (pathArr[1] === "") {
      window.location.href = "/login";
    }
    if (2 < pathArr.length) {
      path = `${pathArr[1]}/${pathArr[2]}`;
    } else {
      path = window.location.pathname.split("/")[1];
    }
    console.log("paths  ",paths);
    return (
      <div className="wrapper p-R" ref={this.cacheElement}>
        <ErrorBoundary Error={true}>
          <Router>
            <Switch>
              {paths.map((pathMap, i) => {
                if (path in routes) {
                  if (pathMap != "") {
                    let C = routes[path];
                    if (!isLoggedIn) {
                      C = routes["login"];
                    }
                    return (
                      <C key={pathMap} param={pathArr[3]} {...this.props} />
                    );
                  }
                } else {
                  return <Route key={pathMap} component={Error} />;
                }
              })}
            </Switch>
          </Router>
        </ErrorBoundary>
      </div>
    );
  }
}

Root.propTypes = propTypes;

export default Root;
