
const initialState = {
  statsFetching: false,
  error: null,
  success: null,
};
export default function userReducer(state = initialState, action) {
  try {
    switch (action.type) {
      case "APPLICATIONSTATS_GET_REQUEST": {
        return {
          ...state,
          statsFetching: true,
        };
      }
      case "APPLICATIONSTATS_GET_FAILURE": {
        return {
          ...state,
          statsFetching: false,
        };
      }
      case "APPLICATIONSTATS_GET_SUCCESS": {
        return {
          ...state,
          statsFetching: false,
          stats: { ...action.payload }
        };
      }
    }
    return state;
  } catch (error) {
    return state;
  }
}
