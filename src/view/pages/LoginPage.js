import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import {
  CssBaseline,
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

import {
  RRTextField,
  RRDateField,
  RRSelectField,
  RRCheckbox,
  RRButton,
  RRLink,
  RRTextFieldBuilder,
  RRButtonBuilder,
} from "../shared/MFComponentWraps";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useDispatch, useSelector } from "react-redux";
import { mLoginPost } from "../../state/actions";
import { log } from "../../state/utils";

import { useHistory } from "react-router-dom";
import { PathFunctionMap as CU, Display } from "../shared/ConstantsUtils";

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

  //Find when state has changed
  const loginState = useSelector((state) => state.loginKey);

  useEffect(() => {
    if (loginState.meta.status === "READY") {
      history.push(CU.HOME.path);
    }
  });
  const theme = useTheme();

  let deviceType = useMediaQuery(theme.breakpoints.down("sm"))
    ? Display.MOBILE
    : Display.UNKNOWN;

  deviceType = useMediaQuery(theme.breakpoints.between("md", "md"))
    ? Display.TAB
    : deviceType === Display.UNKNOWN
    ? Display.DESK
    : deviceType;

  const TabPanel = (props) => {
    return props.index === props.value ? <div> {props.children}</div> : null;
  };

  const tabStyleClass = tabStyle();
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  const classes = useStyles();

  const preventDefault = (event) => event.preventDefault();

  let title = (
    <Typography variant="h5" className={classes.defaultElement}>
      SriRam Invoice
    </Typography>
  );

  let userLoginTFB = new RRTextFieldBuilder({
    size: "medium",
    label: "Userlogin",
    placeholder: "name@domain.com",
    inputLen: "20rem",
  });

  let passwordTFB = new RRTextFieldBuilder({
    size: "medium",
    label: "Password",
    inputLen: "20rem",
    type: "password",
  });
  /////////////////////
  let userNameTFB = new RRTextFieldBuilder({
    size: "medium",
    label: "UserName",
    placeholder: "Firstname Lastname",
    inputLen: "20rem",
  });

  // let userNameTF = RRTextField ({
  //   size : 'medium',
  //   label : 'Username',
  //   placeholder : 'name@domain.com',
  //   inputLen : '20rem'
  // });

  // let passwordTF = RRTextField ({
  //   size : 'medium',
  //   label : 'Password',
  //   // placeholder : 'name@domain.com',
  //   inputLen : '20rem',
  //   type: 'password'
  // });

  let loginButtonB = new RRButtonBuilder({
    caption: "Login",
    clickHandler: () => {
      log("ON click handler button");
      log("username:", userLoginTFB.textValue);
      log("password:", passwordTFB.textValue);

      dispatch(
        mLoginPost({
          userLogin: userLoginTFB.textValue,
          password: passwordTFB.textValue,
        })
      );
    },
  });

  let registerButtonB = new RRButtonBuilder({
    caption: "Register",
    clickHandler: () => {
      log("ON click handler button");
      log("userlogin:", userLoginTFB.textValue);
      log("password:", passwordTFB.textValue);
      log("username:", userNameTFB.textValue);

      // dispatch(mLoginPost({
      //   userLogin: userLoginTFB.textValue,
      //   password: passwordTFB.textValue
      // }));
    },
  });

  let forgotLink = RRLink({ text: "Forgot password" });

  let loginForgotRow = SingleRowOfMFF([
    loginButtonB.getComponent(),
    forgotLink,
  ]);

  let loginColumn = SingleColumnOfMFF([
    title,
    userLoginTFB.getComponent(),
    passwordTFB.getComponent(),
    loginForgotRow,
  ]); //,newUserLink
  /////////////////////////////////////////////////////////

  return (
    <React.Fragment>
      <CssBaseline />
      {/* {scf} */}
      <Box className={classes.mainCanvas}>
        <Paper className={classes.loginPaper}>
          <form noValidate autoComplete="off">
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
                {loginColumn}
                {/* <FlowLayout column>
                  <p>Rama</p>
                  <p>Krishna</p>
                  <p>Govinda</p>
                </FlowLayout> */}
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                Register
                <button
                  type="button"
                  name="deviceType"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("device :" + deviceType);
                  }}
                >
                  Click me to know the device
                </button>
              </TabPanel>
            </Box>
          </form>
        </Paper>
      </Box>
    </React.Fragment>
  );
}

export default LoginPage;
