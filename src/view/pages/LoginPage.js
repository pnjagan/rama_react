import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
// import { useTheme } from "@material-ui/core/styles";

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

import { linkStyle } from "../shared/MFComponentWraps";

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
  let linkClass = linkStyle();

  //Find when state has changed
  const loginState = useSelector((state) => state.loginKey);

  useEffect(() => {
    if (loginState.meta.status === "READY") {
      history.push(CU.HOME.path);
    }
  });
  // const theme = useTheme();
  // let deviceType = Display.UNKNOWN;
  /*
  deviceType = useMediaQuery(theme.breakpoints.down("sm"))
    ? Display.MOBILE
    : Display.UNKNOWN;

  deviceType = useMediaQuery(theme.breakpoints.up("lg"))
    ? Display.DESK
    : deviceType === Display.UNKNOWN
    ? Display.TAB
    : deviceType;
*/
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
                {/* {loginColumn} */}
                <FlowLayout column>
                  {title}
                  <TextField
                    size="medium"
                    label="Userlogin"
                    variant="outlined"
                    placeholder="name@domain.com"
                  />
                  <TextField
                    size="medium"
                    label="Password"
                    type="password"
                    variant="outlined"
                  />
                  <FlowLayout>
                    <Button
                      variant="contained"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(
                          mLoginPost({
                            userLogin: "",
                            password: "",
                          })
                        );
                      }}
                    >
                      Login
                    </Button>
                    <Link href="#" onClick={(e) => e.preventDefault()}>
                      <Typography className={linkClass.root}>
                        Forgot password
                      </Typography>
                    </Link>
                  </FlowLayout>
                </FlowLayout>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                {/* <button
                  onClick={(e) => {
                    e.preventDefault();
                    alert(deviceType);
                  }}
                >
                  WIDTH is {deviceType}
                </button> */}
              </TabPanel>
            </Box>
          </form>
        </Paper>
      </Box>
    </React.Fragment>
  );
}

export default LoginPage;
