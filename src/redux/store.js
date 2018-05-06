import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import {
  reducer as reduxAutoloader,
  saga as reduxAutoloaderSaga
} from "redux-autoloader";

import createSagaMiddleware from "redux-saga";

import navigation from "./navigation";

let composer = null;
if (process.env.NODE_ENV === "development") {
  /* eslint-disable global-require,import/no-extraneous-dependencies */
  composer = require("redux-devtools-extension").composeWithDevTools;
  /* eslint-enable global-require,import/no-extraneous-dependencies */
} else {
  composer = compose;
}

const sagaMiddleware = createSagaMiddleware();
const reducers = combineReducers({
  reduxAutoloader,
  navigation
});
const store = createStore(reducers, composer(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(reduxAutoloaderSaga);

export default store;
