import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import AppBarMenuList from "./AppBarMenuList";

import HamburgerMenu from "./HamburgerMenu";
import AppsIcon from "@material-ui/icons/Apps";
import {
  shadeBlendConvert,
  calculateBestTextColor,
} from "dead-simple-color-utils";

import { useHistory } from "react-router-dom";
import { PathFunctionMap as CU } from "../shared/ConstantsUtils";
import { goTo } from "../shared/goTo";

const useStyles = makeStyles((theme) => ({
  homeLink: {},
}));

const useStylesLinkTypo = makeStyles((theme) => ({
  root: {
    fontSize: "1.2rem",
    padding: "1rem",
    borderStyle: "solid",
    borderWidth: ".05rem",
    borderRadius: ".4rem",
    margin: " .2rem .5rem",
    backgroundColor: shadeBlendConvert(theme.palette.primary.main, -5),
    "&:hover": {
      cursor: "pointer",
      backgroundColor: shadeBlendConvert(theme.palette.primary.main),
      boxShadow: ".1rem .1rem .3rem .1rem",
      // ,
    },
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();

  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const typoClasses = useStylesLinkTypo();

  return (
    <AppBar position="static">
      <Toolbar style={{ display: "flex" }}>
        {/* <a onClick={e=>console.log('ALert')} 
        className = {classes.homeLink}
        ></a> */}
        <Link
          color="inherit"
          TypographyClasses={typoClasses}
          underline="none"
          // className = {classes.toolBarLink}
          onClick={(e) => goTo(history, e, CU.HOME.path)}
        >
          <AppsIcon />
        </Link>

        {/* We cam modify it to flow from the left like a slide window
But looking at menu options, it looks like hamburger does not add any value
It is still just 2 clicks for mobile user, hence removing it.
Mobile user should go through the main MENU
---------------------------
          <Hidden mdUp>
            
            <HamburgerMenu />
          </Hidden>
------------------------------
*/}

        <Hidden smDown>
          <Link
            color="inherit"
            TypographyClasses={typoClasses}
            underline="none"
            onClick={(e) => goTo(history, e, CU.INVOICE.path)}
            // className = {classes.toolBarLink}
          >
            Invoice
          </Link>

          <Link
            color="inherit"
            TypographyClasses={typoClasses}
            underline="none"
            onClick={(e) => goTo(history, e, CU.ITEM.path)}
            // className = {classes.toolBarLink}
          >
            Items
          </Link>

          <Link
            color="inherit"
            TypographyClasses={typoClasses}
            underline="none"
            onClick={(e) => goTo(history, e, CU.CUSTOMER.path)}
            // className = {classes.toolBarLink}
          >
            Customers
          </Link>

          <AppBarMenuList
            menuName="Configurations"
            menuItems={[
              {
                itemName: "Parameters",
                itemHandler(e) {
                  goTo(history, e, CU.CONFIG_PARAM.path);
                },
              },
              {
                itemName: "User Management",
                itemHandler: function (e) {
                  goTo(history, e, CU.CONFIG_USER.path);
                },
              },
              {
                itemName: "Tax Management",
                itemHandler: function (e) {
                  goTo(history, e, CU.CONFIG_TAX.path);
                },
              },
            ]}
          />
        </Hidden>

        <Toolbar style={{ justifyContent: "flex-end", flexGrow: "1" }}>
          <AppBarMenuList
            menuName="Help"
            menuItems={[
              ,
              //  {itemName : "User account", itemHandler: null}
              {
                itemName: "online help",
                itemHandler(e) {
                  goTo(history, e, CU.ONLINE_HELP.path);
                },
              },
              {
                itemName: "Contact us",
                itemHandler(e) {
                  goTo(history, e, CU.CONTACT_US.path);
                },
              },
            ]}
          />

          {/* <AppBarMenuList menuName="LoggedInUser" outline="no" menuItems={ [
             {itemName : "Logout", itemHandler: null}
             ] }/> */}
        </Toolbar>
      </Toolbar>
    </AppBar>
  );
}
