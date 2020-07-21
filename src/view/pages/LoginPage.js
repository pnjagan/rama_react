import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
// import { useTheme } from "@material-ui/core/styles";

import {
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Link,
  Box,
} from "@material-ui/core";

import {
  SingleColumnOfMFF,
  SingleRowOfMFF,
  FlowLayout,
  getDevice,
} from "../shared/LayoutHelper";

import { linkStyle } from "../shared/MFComponentWraps";
import { FFShowError } from "../shared/FFShowError";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useDispatch, useSelector } from "react-redux";
// import { mLoginPost } from "../../state/actions";
import { log, isBlank } from "../../state/utils";
import { reduxStates } from "../../state/ducks/shared";
import { loginRequested, loginResponded } from "../../state/ducks/login";

import { useHistory } from "react-router-dom";
import { PathFunctionMap as CU, Display } from "../shared/ConstantsUtils";

import { Form, Field, FormSpy } from "react-final-form";
import { reduxPromiseListener as promiseListener } from "../../index";
import { FORM_ERROR } from "final-form";

import MakeAsyncFunction from "react-redux-promise-listener";
import produce from "immer";

const useStyles = makeStyles((theme) => ({
  mainCanvas: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  loginPaper: {
    //  width: '400px',
    //  height: '300px',
    margin: "10vh 0 0 0",
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: ".7vh",
  },
}));

const tabStyle = makeStyles((theme) => {
  return {
    root: {
      padding: theme.spacing(0.5),
      backgroundColor: theme.palette.grey[100],
      borderStyle: "solid",
      borderColor: "purple",
      borderWidth: "0.05rem",
      borderRadius: ".3rem",
      margin: ".2rem",
    },
    selected: {
      padding: theme.spacing(0.5),
      backgroundColor: theme.palette.grey[200],
      borderStyle: "solid",
      borderColor: "purple",
      borderWidth: "0.05rem",
      borderRadius: ".3rem",
      margin: ".2rem",
    },
  };
});

function LoginPage() {
  let dispatch = useDispatch();

  let history = useHistory();
  let linkClass = linkStyle();

  //Find when state has changed
  const loginState = useSelector((state) => state.login);

  useEffect(() => {
    if (loginState.meta.status === reduxStates.READY) {
      log("Inside LOGIN USE EFFECT", loginState.meta.status);
      history.push(CU.HOME.path);
    }
  });

  log("inside RENDER of login");

  const TabPanel = (props) => {
    return props.index === props.value ? <div> {props.children}</div> : null;
  };

  const tabStyleClass = tabStyle();
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  const classes = useStyles();

  let title = (
    <Typography variant="h5" className={classes.defaultElement}>
      SriRam Invoice
    </Typography>
  );

  // let forgotLink = RRLink({ text: "Forgot password" });

  return (
    <MakeAsyncFunction
      listener={promiseListener}
      start={loginRequested.type}
      resolve={loginResponded.type}
      reject={""}
      setPayload={(action, payload) => {
        log("Set Payload called act:", action, " payload:", payload);

        return {
          ...action,
          payload: { userLogin: payload.loginName, password: payload.password },
        };
      }}
      getPayload={(action) => {
        log("Get Payload new DOC status :", action.payload);

        const error = action.payload.requestError;
        return produce(action.payload, (draft) => {
          delete draft.requestError;
          draft[FORM_ERROR] = error;
        });
      }}
    >
      {(asyncFunc) => {
        return (
          <Form
            onSubmit={asyncFunc}
            initialValues={{ loginName: "", password: "" }}
            mutators={{}}
            decorators={[]}
            validate={(values) => {
              // log("values :", values);
              const errors = {};
              if (isBlank(values.loginName)) {
                errors.loginName = "Login name is required";
              }

              if (isBlank(values.password)) {
                errors.password = "Password is required";
              } else if (values.password.length < 3) {
                errors[FORM_ERROR] = "Password length cannot be less than 3 ";
              }

              return errors;
            }}
          >
            {({
              submitError,
              submitErrors,
              handleSubmit,
              form,
              submitting,
              pristine,
              values,
              error,
              hasSubmitErrors,
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <React.Fragment>
                    {/* {scf} */}
                    <Box className={classes.mainCanvas}>
                      <Paper className={classes.loginPaper}>
                        <Box className={classes.loginForm}>
                          {loginState.meta.status === "FETCH_FAILED"
                            ? loginState.meta.message
                            : ""}
                          <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            aria-label="simple tabs example"
                          >
                            <Tab
                              classes={tabStyleClass}
                              label="Sign-in"
                              id="simple_tab-0"
                            />
                            <Tab
                              classes={tabStyleClass}
                              label="Register"
                              id="simple_tab-1"
                            />
                          </Tabs>

                          <TabPanel value={tabValue} index={0}>
                            {/* {loginColumn} */}
                            <FlowLayout column>
                              {title}

                              <FFShowError
                                error={error}
                                submitError={submitError}
                              />
                              <Field name="loginName">
                                {({ input, meta }) => (
                                  <>
                                    <TextField
                                      {...input}
                                      size="medium"
                                      label="Userlogin"
                                      variant="outlined"
                                      placeholder="name@domain.com"
                                    />
                                    <FFShowError meta={meta} />
                                  </>
                                )}
                              </Field>

                              <Field name="password">
                                {({ input, meta }) => (
                                  <>
                                    <TextField
                                      {...input}
                                      size="medium"
                                      label="Password"
                                      type="password"
                                      variant="outlined"
                                    />
                                    <FFShowError meta={meta} />
                                  </>
                                )}
                              </Field>

                              <FlowLayout>
                                <Button variant="contained" type="submit">
                                  Login
                                </Button>
                                <Link
                                  href="#"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <Typography className={linkClass.root}>
                                    Forgot password
                                  </Typography>
                                </Link>
                              </FlowLayout>
                            </FlowLayout>
                          </TabPanel>
                          <TabPanel value={tabValue} index={1}>
                            <div>Hare krishna</div>
                          </TabPanel>
                        </Box>
                      </Paper>
                    </Box>
                  </React.Fragment>
                </form>
              );
            }}
          </Form>
        );
      }}
    </MakeAsyncFunction>
  );
}

export { LoginPage };
