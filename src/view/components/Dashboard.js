import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
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
import { log } from "../../state/utils";

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
}));

export function Dashboard(props) {
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
    log("logoutRequested :", logoutRequested());
    dispatch(logoutRequested());
  };

  return (
    <Box className={classes.mainCanvas}>
      <Grid container spacing={3} style={{}}>
        {/* -----------------------------INVOICE ------------------------------------- */}
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <Paper
            elevation={2}
            className={classes.floatingCard}
            onClick={(e) => {
              e.preventDefault();
              log("Clicked Items");
              goTo(e, CU.INVOICE.path);
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
              goTo(e, CU.ITEM.path);
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
              goTo(e, CU.CUSTOMER.path);
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
                goTo(e, CU.CONFIG_PARAM.path);
              }}
              className={classes.submenuLink}
            >
              <Typography align="center">Parameters</Typography>
            </Link>

            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                goTo(e, CU.CONFIG_USER.path);
              }}
              className={classes.submenuLink}
            >
              <Typography align="center">User management</Typography>
            </Link>

            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                goTo(e, CU.CONFIG_TAX.path);
              }}
              className={classes.submenuLink}
            >
              <Typography align="center">Tax management</Typography>
            </Link>
          </Paper>
        </Grid>
        {/* -----------------------------Configurations END-------------------- */}
      </Grid>
    </Box>
  );
}

// export default ContentIndex;
