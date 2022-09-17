const initialState = {
  fetching: false,
  error: null,
  success: null,
  employeeId: "",
  workExperince: null,
  priorEmploymentDetails: [],
};

export default function userReducer(state = initialState, action) {
  try {
    switch (action.type) {
      case "WORKEXPERIENCE_POST_REQUEST": {
        return {
          ...state,
          fetching: true,
        };
      }
      case "WORKEXPERIENCE_POST_SUCCESS": {
        return {
          ...state,
          fetching: false,
        };
      }
      case "WORKEXPERIENCE_POST_FAILURE": {
        return {
          ...state,
          fetching: false,
        };
      }
      case "WORKEXPERIENCE_GET_REQUEST": {
        return {
          ...state,
          fetching: false,
          ...action.payload,
        };
      }
      case "WORKEXPERIENCE_GET_SUCCESS": {
        return {
          ...state,
          fetching: false,
          ...action.payload,
        };
      }
      case "WORKEXPERIENCE_GET_FAILURE": {
        return {
          ...state,
          fetching: false,
          ...action.payload,
        };
      }
      case "ONCHANGE": {
        const data = action.payload;
        return {
          ...state,
          ...data,
        };
      }
    }
    return state;
  } catch (error) {
    return state;
  }
}
