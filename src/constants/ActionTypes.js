/**
 * Constants used across application.
 */
const constants = (() => {
  return {
    GLOBAL_ERROR_EVENT: 'GLOBAL_ERROR_EVENT',
    USER_REGISTER: {
      EDIT:'EDIT',
      ONCHANGE:'ONCHANGE',
      GETOTP_REQUEST: "GETOTP_REQUEST",
      GETOTP_SUCCESS: "GETOTP_SUCCESS",
      GETOTP_FAILURE: "GETOTP_FAILURE",
      OTPVERIFY_REQUEST: "OTPVERIFY_REQUEST",
      OTPVERIFY_SUCCESS: "OTPVERIFY_SUCCESS",
      OTPVERIFY_FAILURE: "OTPVERIFY_FAILURE",
    },
  };
})();

export default constants;
