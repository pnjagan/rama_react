import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  // ,Link
  Box,
  //////////////
  AppBar,
  Toolbar,
  Hidden,
  IconButton,
  Link,
} from "@material-ui/core";
import { SIASnackBar } from "../components/SIASnackBar";

import { Route, Switch } from "react-router-dom";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";

import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

import MenuIcon from "@material-ui/icons/Menu";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import AppToolBar from "../components/AppToolBar";
import Invoice from "./Invoice";

import { useHistory } from "react-router-dom";

import { PathFunctionMap as CU } from "../shared/ConstantsUtils";
import { log } from "../../state/utils";
import WIPPage from "./WIP";
import { logoutRequested } from "../../state/ducks/login";

const useStyles = makeStyles((theme) => ({}));

/*
function mapToContent(path) {
  log("-path check-", path);

  switch (path) {
    case CU.HOME.path:
      return <ContentIndex />;
    default:
      return <WIPPage />;
  }
}
*/

const useRibbonStyles = makeStyles((theme) => ({
  userCard: {
    padding: ".3rem",
    borderRadius: ".3rem",
    margin: `0px 0px ${theme.spacing(1)}px 0px`,
    display: "flex",
    justifyContent: "flex-end",
  },
  userMenuItem: {
    borderStyle: "solid",
    borderWidth: ".05rem",
    borderRadius: ".4rem",
    margin: " .2rem .5rem",
    fontSize: "1.2rem",
    padding: ".7rem",
  },
}));

function UserRibbon() {
  const classes = useRibbonStyles();
  let history = useHistory();

  const loginUser = useSelector((state) => state.login);

  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  let dispatch = useDispatch();

  const handleUserClick = () => {
    setUserMenuOpen((prevOpen) => !prevOpen);
  };

  const handleUserMenuClose = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }

    setUserMenuOpen(false);
  };

  const handleListKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      setUserMenuOpen(false);
    }
  };

  //NO PARAMETERS to dispatch logout to middleware
  const logoutHandler = (e) => {
    log("logoutRequested :", logoutRequested());
    dispatch(logoutRequested());
  };

  const goTo = (e, l) => {
    e.preventDefault();
    history.push(l);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} elevation={2}>
          <Paper className={classes.userCard}>
            <Link
              style={{ padding: ".7rem", cursor: "pointer" }}
              ref={anchorRef}
              onClick={handleUserClick}
              aria-haspopup="true"
              aria-controls={userMenuOpen ? "menu-list-grow" : undefined}
              color="inherit"
              style={{ fontSize: "1.1rem" }}
            >
              {loginUser.data.userName}
            </Link>
          </Paper>
        </Grid>
      </Grid>

      {/* User drop down */}
      <Popper
        open={userMenuOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleUserMenuClose}>
                <MenuList
                  autoFocusItem={userMenuOpen}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    className={classes.userMenuItem}
                    onClick={(e) => {
                      goTo(e, CU.USER_PREFERENCE.path);
                    }}
                  >
                    Preferences
                  </MenuItem>
                  <MenuItem
                    onClick={logoutHandler}
                    className={classes.userMenuItem}
                  >
                    logout
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      {/* User drop down */}
    </>
  );
}

function MainPage(props) {
  const classes = useStyles();
  let history = useHistory();

  /*
    initialize and direct to appropriate URL if user is not signed-in.

  */

  const preventDefault = (event) => event.preventDefault();

  return (
    <React.Fragment>
      <AppToolBar />
      <UserRibbon />

      {(function () {
        let e = Object.entries(CU).filter((en) => {
          // log(" path ", en);
          return en[1].path === history.location.pathname;
        });
        // log(" entry ", e);
        // log("path ", history.location.pathname);
        //[0].component;
        let C = e[0][1].component;
        return <C />;
      })()}
      <SIASnackBar />
    </React.Fragment>
  );
}

export default MainPage;
