import { combineReducers } from "redux";

import { isBlank, log } from "../utils";
import { loginWatcher, loginReducer } from "./login";
import { put, takeLatest, all, select } from "redux-saga/effects";

export const rootReducer = combineReducers({
  login: loginReducer,
});

export function* rootSaga() {
  yield all([loginWatcher()]);
}
