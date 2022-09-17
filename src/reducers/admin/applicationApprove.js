import actionTypes from "constants/admin/ActionTypes";

const initialState = {
  fetching: false,
  error: null,
  success: null,
};

export default function userReducer(state = initialState, action) {
  try {
    switch (action.type) {
      case actionTypes.CANDIDATES.APPLICATIONAPPROVE_GET_REQUEST: {
        return {
          ...state,
          fetching: true,
        };
      }
      case actionTypes.CANDIDATES.APPLICATIONAPPROVE_GET_SUCCESS: {
        return {
          ...state,
          fetching: false,
          ...action.payload,
        };
      }
      case actionTypes.CANDIDATES.APPLICATIONAPPROVE_GET_FAILURE: {
        return {
          ...state,
          fetching: false,
          ...action.payload,
        };
      }
    }
    return state;
  } catch (error) {
    return state;
  }
}
