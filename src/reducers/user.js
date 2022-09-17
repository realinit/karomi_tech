import Helper from "./../utils/helper";

const initialState = {
  fetching: false,
  error: null,
  success: null,
  userId: "",
  userInfo: JSON.parse(localStorage.getItem("user")) || {},
  isLoggedIn: true,
  isOtpRequested: false,
  phoneCode: "+91",
  formFile: '',
};
export default function userReducer(state = initialState, action) {
  try {
    switch (action.type) {
      case "ONCHANGE": {
        const data = action.payload;
        return {
          ...state,
          ...data,
        };
      }
      case "GETOTP_REQUEST": {
        return {
          ...state,
          fetching: true,
        };
      }
      case "GETOTP_FAILURE": {
        return {
          ...state,
          fetching: false,
        };
      }
      case "GETOTP_SUCCESS": {
        const { data = {} } = action.payload;
        const { id = "" } = data;
        return {
          ...state,
          isOtpRequested: true,
        };
      }
      case "OTPVERIFY_SUCCESS": {
        const { data = {} } = action.payload;
        const { token = "", isConsent = false } = data;
        Helper.setJwtAsUUID("dadwddwqdqwdwqdqwdqwdqwdqwdwq");
        return {
          ...state,
          isLoggedIn:  true ,
        };
      }
    }
    return state;
  } catch (error) {
    return state;
  }
}
