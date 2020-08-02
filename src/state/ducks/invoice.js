import { callAPI } from "../ducks/axiosHelper";
import { put, takeLatest, all, select } from "redux-saga/effects";
import { createReducer, createAction } from "@reduxjs/toolkit";
import { log, isBlank } from "../utils";

import { reduxStates, preparePayload } from "./shared";

export function* invoiceGet(action) {
  log("Inside invoice GET Requested", action);

  let data = yield callAPI("/invoices", "get", {
    ...action.payload,
  });

  if (data.status === 200) {
    yield put(
      invoiceGetResponded({
        error: false,
        data: {
          list: data.serverResponse.data,
          currentIndex: 0,
        },
      })
    );
  } else {
    yield put(
      invoiceGetResponded({
        error: true,
        requestError: data.serverResponse.requestError,
        detailError: data.serverResponse.detailError,
      })
    );
  }
}

export function* invoiceSave(action) {
  log("action in invoice Save Saga worker:", action);
  let data = null;

  if (action.payload.id == null) {
    log("invoice POST request");
    data = yield callAPI("/invoices", "post", {
      ...action.payload,
    });
  } else {
    log("invoice PUT request");
    data = yield callAPI(`/invoices/${action.payload.id}`, "put", {
      ...action.payload,
    });
  }

  log("DATA Invoice Save - :", data);

  if (data.status === 200) {
    //There could a validation error with status = 200

    if (
      !isBlank(data.serverResponse.requestError) ||
      !isBlank(data.serverResponse.detailError)
    ) {
      log("Error message from server");

      yield put(
        invoiceSaveResponded({
          error: true,
          requestError: data.serverResponse.requestError,
          detailError: data.serverResponse.detailError,
        })
      );
    } else {
      yield put(
        invoiceSaveResponded({
          error: false,
          data: {
            id: data.serverResponse.data.id,
          },
        })
      );
    }
  } else {
    //status other than 200 from server
    //log("error message :", data.serverResponse.requestError);

    //For response other than 200, we do not expect a field level error
    yield put(
      invoiceSaveResponded({
        error: true,
        requestError: data.serverResponse.requestError,
      })
    );
  }
}

export function* invoiceWatcher() {
  log("Inside invoice saga");
  yield all([takeLatest(invoiceGetRequested, invoiceGet)]);
  yield all([takeLatest(invoiceSaveRequested, invoiceSave)]);
}

//---------------------------
export const invoiceGetRequested = createAction(
  "invoice/get/requested",
  preparePayload
);

export const invoiceGetResponded = createAction(
  "invoice/get/responded",
  preparePayload
);

export const invoiceSaveRequested = createAction(
  "invoice/save/requested",
  preparePayload
);

export const invoiceSaveResponded = createAction(
  "invoice/save/responded",
  preparePayload
);

export const invoiceReducer = createReducer(
  {
    meta: { status: reduxStates.INITIAL, message: "" },
    data: { list: [], currentIndex: -1 },
  },
  {
    [invoiceGetRequested]: (state, action) => {
      state.meta.status = reduxStates.GET_IN_PROGRESS;
      state.data.list = [];
      state.data.currentIndex = -1;
    },
    [invoiceGetResponded]: (state, action) => {
      if (action.error) {
        state.meta.status = reduxStates.GET_FAILED;
      } else {
        state.meta.status = reduxStates.READY;
      }
      state.data = action.payload;
    },
    /* No Action in reducer for saveRequested or saveResponded. 
    //There does not seem to be any advantage to keep that in store */
    // [invoiceSaveResponded]: (state, action) => {
    //   if (action.error) {
    //     state.meta.status = reduxStates.UPDATE_FAILED;
    //   } else {
    //     state.meta.status = reduxStates.READY;
    //   }
    //   state.data = action.payload;
    // },
  }
);
