import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
// import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import WIP from "./pages/WIP";
import { PathFunctionMap as CU } from "./shared/ConstantsUtils";
import { Route, Switch } from "react-router-dom";
import { log, isBlank } from "../state/utils";
import { useHistory, useLocation, Redirect } from "react-router-dom";

import { logoutRequested, loginRequested } from "../state/ducks/login";
import { reduxStates } from "../state/ducks/shared";

// SA uses following convention
// /module/function?PARAM=VALUE
// All the info other than module and function have to be incorporated as a parameter
// history.location.pathname contains the fullpath ..
// history.location.search will contain the query string ..

// match.params.function will contain the function..

/*
SIGN_IN is redirected from Apps
*/
const pathsToMain = Object.entries(CU).reduce((newList, currEntry) => {
  return currEntry[0] !== "SIGN_IN" && !newList.includes(currEntry[1].path)
    ? newList.concat(currEntry[1].path)
    : [...newList];
}, []);

//props
function App() {
  // log("PROPS in APPS :", props);
  const history = useHistory();
  const location = useLocation();

  const loginState = useSelector((state) => state.login);

  let dispatch = useDispatch();

  useEffect(() => {
    log("inside use effect");
    if (
      isBlank(loginState.data.userLogin) &&
      !isBlank(localStorage.getItem("siaUserLogin"))
    ) {
      dispatch(
        loginRequested({
          userLogin: localStorage.getItem("siaUserLogin"),
          jwtToken: localStorage.getItem("siaJWT"),
        })
      );
    }
  }, []);

  // log(typeof(a));
  log("token :", localStorage.getItem("siaJWT"));

  log("CUrrent Path :", location.pathname);
  log(" Login STatus", loginState.meta.status);

  log(
    "INvaid LOGIN check",
    isBlank(localStorage.getItem("siaJWT")), //localStorage has no Valid Value
    isBlank(localStorage.getItem("siaUserLogin")),
    //Exclusion pages
    location.pathname !== CU.SIGN_IN.path,
    loginState.meta.status !== reduxStates.READY
  );

  if (
    (isBlank(localStorage.getItem("siaJWT")) ||
      isBlank(localStorage.getItem("siaUserLogin")) ||
      loginState.meta.status !== reduxStates.READY) && //localStorage has no Valid Value
    location.pathname !== CU.SIGN_IN.path
  ) {
    log("Invalid SIGN IN DETAILS, push to Sign in page");
    return <Redirect to={CU.SIGN_IN.path} />;
    // history.push(CU.SIGN_IN.path);
  }

  //If Path is SignIN or Registration, no need to check LOGIN STATUS
  if (location.pathname === CU.SIGN_IN.path) {
    // return <Route component={CU.SIGN_IN.component} exact />;
    return <CU.SIGN_IN.component />;
  }

  if (loginState.meta.status === reduxStates.READY) {
    return (
      <Switch>
        <Route path={pathsToMain} component={MainPage} exact />
        <Route component={WIP} />
      </Switch>
    );
  } else if (loginState.meta.status === reduxStates.GET_IN_PROGRESS) {
    return <div>Please wait, login in-progress</div>;
  } else {
    log("INSIDE UNEXPECTED PROBLEM", loginState);
    return <div>Unexpected condition, wait to resolve or contact admin!</div>;
  }
}

export default App;
