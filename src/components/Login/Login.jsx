import React, { Component, Fragment } from "react";
import utility from "../../utils/utility";
import "../../../public/css/main.css";
import InputBox from "../Common/inputBox/input";
import "./login.less";
import countryCode from "../../utils/countryCode.json";

import animationManager from "library/hoc/animationManager/animationManager";
import Notifications from "react-notify-toast";

import MasterLayout from "shared/layout/masterLayout";

class Login extends Component {
  constructor(props) {
    super(props);
    this.data = {};
    this.animationManager = animationManager();
    this.state = {
      a: '',
      m: '',
      r: ''
    }
  }

  async componentDidMount() {
    }

  onChangeHandler = (e, name) => {
    const { onInputChange } = this.props;
    const val = e.target.value;
    onInputChange({ [name]: val });
  };

  onclickHandler = () => {
    const { otpVerify, otp } = this.props;
    if (true) {
      otpVerify({ otp});
    } else {
      utility.errorToaster(" not valid!", 4000, "error");
    }

  };
  getOtp = () => {
    try {
      const { phoneNumber, otpRequested, phoneCode } = this.props;
      if (!/^[0-9]{10}$/.test(phoneNumber)) {
        utility.errorToaster("Phone number not valid!", 4000, "error");
      } else {
        otpRequested({ username: `${phoneCode}${phoneNumber}` });
      }
    } catch (error) {
      alert(error);
    }
  };

  render() {
    const {
      phoneCode = "+91",
      phoneNumber,
      otp,
      isOtpRequested = false,
      fetching,
      applicationNumber,
    } = this.props;
    const { a, m, r } = this.state;
    return (
      <div className="login__section">
        <div className={"error-icon__close"}>
          <Notifications options={{ zIndex: 9999 }} />
        </div>
        <MasterLayout bgV2={true}>
          <this.animationManager
            animationDuration={1}
            baseClass="searchBox__content loginpage"
            zIndex={4}
          >
            <div className="login__form">
              <h1 className="login__form_heading mt-4">Your Registered Mobile Number</h1>
              <div className="mobileWrap">
                <select
                  className="mobileWrap_code formField_input"
                  name="phoneCode"
                  value={phoneCode}
                  onChange={(e) => this.onChangeHandler(e, "phoneCode")}
                  disabled={isOtpRequested || r == "email"}
                >
                  <option value="">---Select---</option>
                  {countryCode.map((d) => {
                    return (
                      <option key={d.code} value={d.dial_code}>
                        {d.name}
                      </option>
                    );
                  })}
                </select>
                <InputBox
                  type="number"
                  name="phoneNumber"
                  className="mobileWrap_number"
                  placeholder="Mobile Number"
                  value={r == "email" ? m : phoneNumber}
                  handleChange={(e) => this.onChangeHandler(e, "phoneNumber")}
                  disabled={isOtpRequested || r == "email"}
                />
                {!isOtpRequested && (
                  <button
                    type="button"
                    className="btn gbtn mobileWrap_btn"
                    onClick={this.getOtp}
                    disabled={
                      (!phoneNumber && !phoneCode) || isOtpRequested || fetching
                    }
                  >
                    GET OTP
                  </button>
                )}
              </div>
              {isOtpRequested && (
                <Fragment>
                  <div className="otpWrap">
                    <h1 className="login__form_heading">Code</h1>
                    <div className="otpWrap__actions">
                      <div className="otpWrap__actions__inputWrap">
                        <InputBox
                          type="number"
                          name="otp"
                          className="otpWrap_otp"
                          placeholder="Code"
                          value={otp}
                          handleChange={(e) => this.onChangeHandler(e, "otp")}
                        />
                      </div>
                      <button
                        type="button"
                        className="btn gbtn"
                        onClick={this.onclickHandler}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
          </this.animationManager>
        </MasterLayout>
      </div >
    );
  }
}

export default Login;
