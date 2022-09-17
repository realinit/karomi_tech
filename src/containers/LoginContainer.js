import React from "react";
import { connect } from "react-redux";
import {
  userLogin,
  onInputChange,
  otpRequested,
  otpVerify,
  usernameEdit,
} from "../actions/UserActions";
import LoginComponent from "../components/Login/Login";

const LoginContainer = (props) => <LoginComponent {...props} />;

const mapStateToProps = (state) => {
  const { router, user } = state;
  return {
    router,
    ...user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  userLogin(payload) {
    dispatch(userLogin(payload));
  },
  onInputChange(payload) {
    dispatch(onInputChange(payload));
  },
  otpRequested(payload) {
    dispatch(otpRequested(payload));
  },
  otpVerify(payload) {
    dispatch(otpVerify(payload));
  },
  usernameEdit() {
    dispatch(usernameEdit());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
