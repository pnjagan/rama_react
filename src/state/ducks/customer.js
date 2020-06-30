import { callAPI } from "../ducks/axiosHelper";
import { put, takeLatest, all, select } from "redux-saga/effects";
import { createReducer, createAction } from "@reduxjs/toolkit";
import { log } from "../utils";

import { FORM_ERROR } from "final-form";
import { reduxStates, preparePayload } from "./shared";

export function* customerGet(action) {
  /*
  TO FILL
  */
  // log("Inside customer GET Requested", action);
}

export function* customerSave(action) {
  log("action in customer Save Saga worker:", action);
  let data = null;

  if (action.payload.id == null) {
    //customer
    data = yield callAPI("/customers", "post", {
      ...action.payload,
    });
  } else {
    data = yield callAPI(`/customers/${action.payload.id}`, "put", {
      ...action.payload,
    });
  }

  if (data.status === 200) {
    //There could a validation error with status = 200

    if (data.serverResponse.ERROR_MESSAGE != null) {
      log("Error message from server");
      yield put(
        customerSaveResponded({
          aError: true,
          [FORM_ERROR]: data.serverResponse.ERROR_MESSAGE,
        })
      );
    } else if (data.serverResponse.FIELD_ERRORS) {
      yield put(
        customerSaveResponded({
          aError: true,
          ...data.serverResponse.FIELD_ERRORS,
        })
      );
    } else {
      yield put(
        customerSaveResponded({
          aError: false,
          sdata: {
            customerId: data.serverResponse.result,
          },
        })
      );
    }
  } else {
    customerSaveResponded({
      aError: true,
      [FORM_ERROR]: data.serverResponse.message,
    });
  }

  log("Response in customer save Saga worker:", data);
}

export function* customerWatcher() {
  log("Inside customer saga");
  yield all([takeLatest(customerGetRequested, customerGet)]);
  yield all([takeLatest(customerSaveRequested, customerSave)]);
}

//---------------------------
export const customerGetRequested = createAction(
  "customer/get/requested",
  preparePayload
);

export const customerGetResponded = createAction(
  "customer/get/responded",
  preparePayload
);

export const customerSaveRequested = createAction(
  "customer/save/requested",
  preparePayload
);

export const customerSaveResponded = createAction(
  "customer/save/responded",
  preparePayload
);

export const customerReducer = createReducer(
  {
    meta: { status: reduxStates.INITIAL, message: "" },
    data: { customerList: [], currentIndex: -1 },
  },
  {
    [customerGetRequested]: (state, action) => {
      state.meta.status = reduxStates.GET_IN_PROGRESS;
      state.data.customerList = [];
      state.data.currentIndex = -1;
    },
    [customerGetResponded]: (state, action) => {
      if (action.error) {
        state.meta.status = reduxStates.GET_FAILED;
      } else {
        state.meta.status = reduxStates.READY;
      }
      state.data = action.payload;
    },
    /* No Action in reducer for saveRequested or saveResponded. 
    //There does not seem to be any advantage to keep that in store */
    // [customerSaveResponded]: (state, action) => {
    //   if (action.error) {
    //     state.meta.status = reduxStates.UPDATE_FAILED;
    //   } else {
    //     state.meta.status = reduxStates.READY;
    //   }
    //   state.data = action.payload;
    // },
  }
);
