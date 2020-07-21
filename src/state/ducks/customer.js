import { callAPI } from "../ducks/axiosHelper";
import { put, takeLatest, all, select } from "redux-saga/effects";
import { createReducer, createAction } from "@reduxjs/toolkit";
import { log, isBlank } from "../utils";

import { reduxStates, preparePayload } from "./shared";

export function* customerGet(action) {
  log("Inside customer GET Requested", action);

  let data = null;
  yield put(
    customerGetResponded({
      error: false,
      data: {
        customerList: [
          {
            id: 1,
            name: "Hare Krishna 1",
            number: "HK01",
            email: "krishna1@chennai.com",
            address_line1: "NO 1, madhavan st, govindapuram",
            // address_line2: "Ram  Ram 1",
            // address_line3: "Krishna  Krishna 1",
          },
          {
            id: 2,
            name: "Hare Krishna 2",
            number: "HK02",
            email: "krishna2@chennai.com",
            address_line1: "NO 2, madhavan st, govindapuram",
            // address_line2: "Ram  Ram 2",
            // address_line3: "Krishna  Krishna 2",
          },
        ],
        currentIndex: 0,
      },
    })
  );

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

  log("DATA customer Save - :", data);

  if (data.status === 200) {
    //There could a validation error with status = 200

    if (
      !isBlank(data.serverResponse.requestError) ||
      !isBlank(data.serverResponse.detailError)
    ) {
      log("Error message from server");

      yield put(
        customerSaveResponded({
          error: true,
          requestError: data.serverResponse.requestError,
          detailError: data.serverResponse.detailError,
        })
      );
    } else {
      yield put(
        customerSaveResponded({
          error: false,
          data: {
            customerId: data.serverResponse.result,
          },
        })
      );
    }
  } else {
    //status other than 200 from server
    //log("error message :", data.serverResponse.requestError);

    //For response other than 200, we do not expect a field level error
    yield put(
      customerSaveResponded({
        error: true,
        requestError: data.serverResponse.requestError,
      })
    );
  }

  // log("Response in customer save Saga worker:", data);
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
