export const reduxStates = {
  INITIAL: "INITIAL",
  GET_IN_PROGRESS: "GET_IN_PROGRESS",
  READY: "READY",
  UPDATE_IN_PROGRESS: "UPDATE_IN_PROGRESS",
  UPDATE_FAILED: "UPDATE_FAILED",
  GET_FAILED: "GET_FAILED",
};

export function preparePayload(params) {
  if (params != null) {
    let { aError, aMeta } = params;
    delete params.aError;
    delete params.aMeta;
    aError = aError == null ? false : aError;

    return {
      payload: { ...params },
      error: aError,
      meta: aMeta,
    };
  } else {
    return {
      payload: {},
      error: false,
      meta: undefined,
    };
  }
}
