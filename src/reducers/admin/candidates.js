import actionTypes from "constants/admin/ActionTypes";

const initialState = {
  fetching: false,
  error: null,
  success: null,
  userList: []
};

export default function userReducer(state = initialState, action) {
  try {
    switch (action.type) {
      case actionTypes.CANDIDATES.CANDIDATES_GET_REQUEST: {
        return {
          ...state,
          fetching: true,
        };
      }
      case actionTypes.CANDIDATES.CANDIDATES_GET_SUCCESS: {
        return {
          ...state,
          fetching: false,
          userList: [...action.payload],
          filterUsers: [...action.payload],
        };
      }
      case actionTypes.CANDIDATES.CANDIDATES_GET_SUCCESS_FILTER: {
        return {
          ...state,
          fetching: false,
          filterUsers: [...action.payload],
        };
      }
      case actionTypes.CANDIDATES.CANDIDATES_GET_FAILURE: {
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
