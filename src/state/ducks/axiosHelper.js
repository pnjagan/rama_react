import axios from "axios";
import { log } from "../utils";

let headers = {};
headers["Content-Type"] = "application/json";
headers["Accept"] = "application/json";

let config = {
  timeout: 10000000,
  headers,
};

/*
OUTPUT of call API is uniform irrespective of failure or success

{
    status:
    statusText:
    response : <the JSON from server>
}

*/

const baseURL = "http://localhost:3100";
export const callAPI = (endPoint, method, data) => {
  log("Input data in call API :", data);
  log("method :", method);
  headers["x-access-token"] = localStorage.getItem("siaJWT");

  log("config :", config);
  let data2 = null;
  if (method === "GET") {
    data2 = { ...data, token: localStorage.getItem("siaJWT") };
  } else {
    data2 = { ...data };
  }

  return axios[method](
    `${baseURL}${endPoint}?token=${localStorage.getItem("siaJWT")}`,
    data2,
    config
  ).then(
    (response) => {
      log("Success API: ", response);
      return {
        status: response.status,
        statusText: response.statusText,
        serverResponse: response.data,
      };
    },
    (error) => {
      log("Error API :", error);

      // log("status :", error.response.status);
      // log("statusText :", error.response.statusText);
      // log("data :", error.response.data);

      if (error.response != null) {
        return {
          status: error.response.status,
          statusText: error.response.statusText,
          serverResponse: error.response.data,
        };
      } else {
        //No response receive means error is on our side or the network
        return {
          status: "NETWORK_ERROR",
          statusText: "Network Error",
          serverResponse: "",
        };
      }

      /*
      if (error.isAxiosError == null) {
        //server error

      } else {

      }
      */
    }
  );
};
