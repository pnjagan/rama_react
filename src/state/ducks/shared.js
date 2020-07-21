import { log } from "../utils";

export const reduxStates = {
  INITIAL: "INITIAL",
  GET_IN_PROGRESS: "GET_IN_PROGRESS",
  READY: "READY",
  UPDATE_IN_PROGRESS: "UPDATE_IN_PROGRESS",
  UPDATE_FAILED: "UPDATE_FAILED",
  GET_FAILED: "GET_FAILED",
};

export function preparePayload(params) {
  log("Prepayload :", params);

  if (params != null) {
    let { error, meta } = params;
    delete params.error;
    delete params.meta;
    error = error == null ? false : error;

    return {
      payload: { ...params },
      error: error,
      meta: meta,
    };
  } else {
    return {
      payload: {},
      error: false,
      meta: undefined,
    };
  }
}
