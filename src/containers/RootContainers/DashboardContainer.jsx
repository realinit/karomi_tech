import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { initEnvironment } from "shared/actions/environmentActions";
import { initRouter } from "shared/actions/routerActions";
import { browserHistory, withRouter } from "react-router";
import {
  HOME_PAGE,
  LOGIN_PAGE,
  INBOX_PAGE,
  ASSET_PAGE,
} from "constants/RouterConstants";
import {
  LoadableLoginContainer,
  LoadableInboxContainer
} from "../LoadableContainer";

import Home from '../../components/Home'

import Root from "components/Root.jsx";
const RootContainer = (props) => <Root {...props} />;
const mapStateToProps = (state) => {
  const {
    router,
    user: { isLoggedIn },
    errorHandler,
  } = state;

  var pathMapping = [
    HOME_PAGE,
    LOGIN_PAGE,
    INBOX_PAGE,
    ASSET_PAGE,
  ];
  var urlMapping = {
    [LOGIN_PAGE]: LoadableLoginContainer,
    [HOME_PAGE]: Home,
    [INBOX_PAGE]: LoadableInboxContainer,
    [ASSET_PAGE]: LoadableLoginContainer,
  };

  var postQuoteList = {};

  /**
   * this assigns postQuoteList to urlMaping
   * and mutates urlMapping with postQuoteList property and propert in urlMapping
   *  having same key as postQuoteList will be overridden
   */
  urlMapping = _.extend(urlMapping, postQuoteList);

  return {
    paths: pathMapping,
    router,
    routes: urlMapping,
    isLoggedIn,
    errorHandler,
  };
};

const mapDispatchToProps = (dispatch) => ({
  saveErrors(payload) {
    dispatch(saveErrors(payload));
  },
  initEnvironment,
  initRouter,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RootContainer)
);
