import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { log } from "../../state/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  CssBaseline,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Link,
  Box,
  //////////////
  AppBar,
  Toolbar,
  Hidden,
  IconButton,
} from "@material-ui/core";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";

import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

import MenuIcon from "@material-ui/icons/Menu";
// import Link from '@material-ui/core/Link';

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { PathFunctionMap as CU } from "../shared/ConstantsUtils";

import { logoutRequested } from "../../state/ducks/login";

const useStyles = makeStyles((theme) => ({
  title: {},
  mainCanvas: {
    margin: `0px ${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(
      2
    )}px`,

    // marginTop: 0,
    // marginLeft: theme.spacing(2),
    // marginRight : theme.spacing(2),
    // marginBottom : theme.spacing(2),
  },

  userCard: {
    padding: ".3rem",
    borderRadius: ".3rem",
    margin: `0px 0px ${theme.spacing(1)}px 0px`,
    display: "flex",
    justifyContent: "flex-end",
  },
  submenuLink: {
    display: "block",
    margin: theme.spacing(1),
    borderStyle: "solid",
    borderWidth: ".1rem",
    padding: ".7rem",
    borderRadius: ".3rem",
  },
  cardHeading: {
    ...theme.typography.h6,
  },
  floatingCard: {
    cursor: "pointer",
    "&:hover": {
      boxShadow: ".1rem .1rem .3rem .1rem",
    },
    padding: ".7rem",
    borderRadius: ".3rem",
  },
  configCard: {
    //    cursor : 'pointer',
    padding: ".7rem",
    borderRadius: ".3rem",
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

function ContentIndex(props) {
  const classes = useStyles();
  let history = useHistory();

  const loginUser = useSelector((state) => state.login);

  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  let dispatch = useDispatch();

  const goTo = (e, l) => {
    e.preventDefault();
    history.push(l);
  };

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
    log("logoutRequested ", logoutRequested());
    dispatch(logoutRequested());
  };

  return (
    <Box className={classes.mainCanvas}>
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
                  <MenuItem className={classes.userMenuItem}>
                    Preferences{" "}
                  </MenuItem>
                  <MenuItem
                    onClick={logoutHandler}
                    className={classes.userMenuItem}
                  >
                    logout{" "}
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      {/* User drop down */}

      <Grid container spacing={3} style={{}}>
        {/* -----------------------------INVOICE ------------------------------------- */}
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <Paper
            elevation={2}
            className={classes.floatingCard}
            onClick={(e) => {
              e.preventDefault();
              log("Clicked Items");
            }}
          >
            <Typography
              variant="h6"
              className={classes.cardHeading}
              align="center"
            >
              Invoice
            </Typography>
          </Paper>
        </Grid>

        {/* -----------------------------ITEMS ------------------------------------- */}
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <Paper
            elevation={2}
            className={classes.floatingCard}
            onClick={(e) => {
              e.preventDefault();
              log("Clicked Items");
            }}
          >
            <Typography
              variant="h6"
              className={classes.cardHeading}
              align="center"
            >
              Items
            </Typography>
          </Paper>
        </Grid>

        {/* -----------------------------CUSTOMERS ------------------------------------- */}
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <Paper
            elevation={2}
            className={classes.floatingCard}
            onClick={(e) => {
              e.preventDefault();
              log("Clicked Items");
            }}
          >
            <Typography
              variant="h6"
              className={classes.cardHeading}
              align="center"
            >
              Customers
            </Typography>
          </Paper>
        </Grid>

        {/* -----------------------------Configurations ------------------------------------- */}
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <Paper elevation={2} className={classes.configCard}>
            <Typography
              variant="h6"
              className={classes.cardHeading}
              align="center"
            >
              Configurations
            </Typography>

            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                log("CLicked Params");
              }}
              className={classes.submenuLink}
            >
              <Typography align="center">Parameters</Typography>
            </Link>

            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
              }}
              className={classes.submenuLink}
            >
              <Typography align="center">User management</Typography>
            </Link>

            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
              }}
              className={classes.submenuLink}
            >
              <Typography align="center">Tax management</Typography>
            </Link>

            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
              }}
              className={classes.submenuLink}
            >
              <Typography align="center">Shipping methods</Typography>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ContentIndex;
