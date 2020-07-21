import { callAPI } from "../ducks/axiosHelper";
import { put, takeLatest, all, select } from "redux-saga/effects";
import { createReducer, createAction } from "@reduxjs/toolkit";
import { log } from "../utils";

import { reduxStates, preparePayload } from "./shared";

export function* loginUser(action) {
  log("action in SAGA worker:", action);

  const data = yield callAPI("/login", "post", {
    ...action.payload,
  });

  log("Response in Saga worker:", data);

  if (data.status === 200) {
    log("Full data :", data);
    localStorage.setItem("siaJWT", data.serverResponse.data.jwtToken);
    localStorage.setItem("siaUserLogin", data.serverResponse.data.userLogin);
    //UserName not be stored in localStorage

    log("JWT set", localStorage.getItem("siaJWT"));

    yield put(
      loginResponded({
        userLogin: data.serverResponse.data.userLogin,
        userName: data.serverResponse.data.userName,
        error: false,
      })
    );
  } else {
    if (data.status === "NETWORK_ERROR") {
      yield put(
        loginResponded({
          error: true,
          requestError: "Unexpected network error.please try again",
        })
      );
    } else {
      //Get server error and send to FORM ERROR
      yield put(
        loginResponded({
          error: true,
          requestError: data.serverResponse.requestError,
        })
      );
    }
  }
}

export function* logoutUser(action) {
  //UserName not be stored in localStorage
  localStorage.removeItem("siaJWT");
  localStorage.removeItem("siaUserLogin");
}

export function* loginWatcher() {
  log("Inside Login watcher");
  yield all([
    takeLatest(loginRequested, loginUser),
    takeLatest(logoutRequested, logoutUser),
  ]);
}

//---------------------------
export const loginRequested = createAction("login/requested", preparePayload);
export const logoutRequested = createAction("logout/requested", preparePayload);
export const loginResponded = createAction("login/responded", preparePayload);

export const loginReducer = createReducer(
  {
    meta: { status: reduxStates.INITIAL, message: "" },
    data: { userLogin: "", userName: "" },
  },
  {
    [loginRequested]: (state, action) => {
      state.meta.status = reduxStates.GET_IN_PROGRESS;
      state.data = action.payload;
    },
    [loginResponded]: (state, action) => {
      //   log("Login responded :", action);
      if (action.error) {
        state.meta.status = reduxStates.GET_FAILED;
      } else {
        state.meta.status = reduxStates.READY;
      }
      state.data = action.payload;
    },
    [logoutRequested]: (state, action) => {
      state.data = { userLogin: "", userName: "" };
      state.meta.status = reduxStates.INITIAL;
    },
  }
);
