import { combineReducers } from "redux";
import config from "config";

//import session from '../reducers/session';
import environment from "../reducers/environment";
import router from "../reducers/router";
import user from "../reducers/user";
import errorHandler from "./errorHandler";

const rootReducer = combineReducers({
  environment,
  router,
  user,
  errorHandler,
});

export default rootReducer;
