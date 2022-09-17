/* global history */
/* global location */
/* global window */

import actionTypes from "constants/ActionTypes";

import { compileHash, parseRoute } from "utils/RouterUtils";

const pushState = (route) => {
  try {
    const path = compileHash(route);
    if (location.pathname + location.search !== path) {
      window.history.pushState({ route }, "", path);
    }
  } catch (error) {
    //console.error(error)
  }
};

export const navigateTo = (route) => {
  pushState(route);
  return {
    type: actionTypes.CHANGE_ROUTE,
    route,
  };
};

export const navigateBack = (e) => (dispatch) => {
  const { state } = e;
  if (state) {
    const { route } = state;
    dispatch(navigateTo(route, false));
  }
};

export const initRouter = (paths) => (dispatch) => {
  window.onpopstate = (e) => {
    dispatch(navigateBack(e));
  };

  const path = location.pathname + location.search;
  const route = parseRoute(path, paths);
  return dispatch(navigateTo(route));
};

export const clearStateData = () => {
  return {
    type: actionTypes.RESET_STATE_DATA,
  };
};

export function saveUtmData(utmData) {
  return {
    type: actionTypes.SAVE_UTM_DATA,
    utmData,
  };
}

export const setUtmData = (utmData) => (dispatch) => {
  return dispatch(saveUtmData(utmData));
};

export const resetStateData = (e) => (dispatch) => {
  return dispatch(clearStateData());
};
