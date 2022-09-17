import Helper from "./../../utils/helper";

const initialState = {
  fetching: false,
  error: null,
  success: null,
  isAdminLoggedIn: Helper.getJwtToken('a_uuid') ? true : false,
};
export default function userReducer(state = initialState, action) {
  try {
    switch (action.type) {
      case "ADMIN_LOGIN_REQUEST": {
        return {
          ...state,
          fetching: true,
        };
      }
      case "ADMIN_LOGIN_FAILURE": {
        return {
          ...state,
          fetching: false,
        };
      }
      case "ADMIN_LOGIN_SUCCESS": {
        const { data = {} } = action.payload;
        const { token = "", id, user } = data;
        Helper.setJwtAsUUID(token, "a_uuid");
        Helper.setEmpId(id, "adminId");
        Helper.setEmpId(JSON.stringify(user), "logedinuserData");
        return {
          ...state,
          adminId: id,
          isAdminLoggedIn: token && id ? true : false,
        };
      }
    }
    return state;
  } catch (error) {
    return state;
  }
}
