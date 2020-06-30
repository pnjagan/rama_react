import { combineReducers } from "redux";

import { isBlank, log } from "../utils";
import { loginWatcher, loginReducer } from "./login";
import { customerWatcher, customerReducer } from "./customer";

import { put, takeLatest, all, select } from "redux-saga/effects";

export const rootReducer = combineReducers({
  login: loginReducer,
  customer: customerReducer,
});

export function* rootSaga() {
  // log("Inside ROOT saga");

  //Method 1 - Blocking. AFter ALl nothing runs
  yield all([customerWatcher(), loginWatcher()]);

  //Method 2 -  non blocking
  //yield fork(saga1)
  //yield fork(saga2)
}
