import Helper from "./../utils/helper";
import ExternalApiRequest from "./../utils/externalApiRequest";
import actionTypes from "constants/ActionTypes";
import { navigateTo } from "./RouterActions";
import utility from "../utils/utility";

export const checkUserLogin = (dispatch) => {
  const jwtToken = Helper.getJwtToken();
  const type = jwtToken
    ? actionTypes.USER_ACTIONS.USER_LOGGED_IN
    : actionTypes.USER_ACTIONS.USER_NOT_LOGGED_IN;
  return { type };
};

export const getUserByJwt = () => {
  const userInfo = Helper.getUserInfoFromJwt();
  return {
    type: actionTypes.USER_ACTIONS.GET_USERINFO_FROM_JWT,
    payload: userInfo,
  };
};

/**
 * Needs to be checked
 */

export const replaceToken = (token) => {
  return (dispatch) => {
    dispatch({
      type: "REPLACE_TOKEN",
      payload: token,
    });
  };
};
export const logoutSession = () => {
  utility.removeCookie("uuid");
  utility.removeCookie("employeeId");
  utility.removeCookie("isConsent");
  window.location.href = `/login`;
};

export const usernameEdit = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.USER_REGISTER.EDIT,
    });
  };
};
export const onInputChange = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.USER_REGISTER.ONCHANGE,
      payload,
    });
  };
};

export const otpRequested = (query) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.USER_REGISTER.GETOTP_REQUEST,
    });
    // const options = {
    //   api: "api name",
    //   content: query,
    // };
    const response =  {payload:{},status:{success:true}}// await ExternalApiRequest(options);
    const { payload = {}, status = {} } = response;
    if (status.success) {
      return dispatch({
        type: actionTypes.USER_REGISTER.GETOTP_SUCCESS,
        payload,
      });
    } else {
      utility.errorToaster(
        "Server is busy.Please try after sometime.",
        4000,
        "error"
      );
      return dispatch({
        type: actionTypes.USER_REGISTER.GETOTP_FAILURE,
        payload,
      });
    }
  };
};

export const otpVerify = (query) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.USER_REGISTER.OTPVERIFY_REQUEST,
    });
    // const options = {
    //   api: "api name",
    //   content: query,
    // };
    const response = {payload:{},status:{success:true}};//await ExternalApiRequest(options);
    const { payload = {}, status = {} } = response || {};
    if (status.success) {
      dispatch({
        type: actionTypes.USER_REGISTER.OTPVERIFY_SUCCESS,
        payload: response.payload,
      });
      return (window.location.href = "/inbox");
    } else {
      utility.errorToaster(
        "Not valid! Please Enter a vaild OTP.",
        4000,
        "error"
      );
      return dispatch({
        type: actionTypes.USER_REGISTER.OTPVERIFY_FAILURE,
        payload: response.payload,
      });
    }
  };
};


