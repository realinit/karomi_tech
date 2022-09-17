import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/index';
import { persistStore } from 'redux-persist';
const middlewares = [];

if (process.env.NODE_ENV === 'developments') {
  const { createLogger } = require('redux-logger');
  const logger = createLogger({
    collapsed: true,
    duration: true
  });
  middlewares.push(logger);
}

middlewares.push(thunkMiddleware);
const composedWithDevtools = composeWithDevTools( applyMiddleware( ...middlewares ) );
const createStoreWithMiddleware = composedWithDevtools(createStore);
export default function configureStore(initialState) {
      let store         = createStoreWithMiddleware(rootReducer, initialState);
      let persistor     = persistStore(store);
      return { store, persistor };
}
