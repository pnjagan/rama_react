
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
          CssBaseline
          ,Typography
          ,Container
          ,Paper
          ,TextField
          ,Button
          ,Link
          ,Box
          //////////////
          ,AppBar
          ,Toolbar
          ,Hidden
          ,IconButton
      } from '@material-ui/core';

 

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';

import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';      

import MenuIcon from '@material-ui/icons/Menu';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import AppBarMenuList from './AppBarMenuList';

import HamburgerMenu from './HamburgerMenu';




const useStyles = makeStyles(theme => ({
    title : {

    },      
  }
));



export default function ButtonAppBar() {
  const classes = useStyles();

  const theme = useTheme();

   const mdDown = useMediaQuery(theme.breakpoints.down('md'));



  return (

      <AppBar position="static">
        <Toolbar style={{display: 'flex'}}>

          <Typography variant="h6" className={classes.title}>
              SApps
          </Typography>  

          <Hidden mdUp>
            <HamburgerMenu />
        {/*
            <AppBarMenuList menuName="Items" hamburgerMenu="Y" menuItems={ [ 
            {itemName : "Invoice"         , itemHandler: null}
            ,{itemName : "Items"     , itemHandler: null}
            ,{itemName : "Customers"    , itemHandler: null}
            ,{itemName : "Config" , itemHandler: null}                
            ] }/>




        */}
          </Hidden>

        <Hidden smDown>

          <AppBarMenuList menuName="Invoice" menuItems={ [ 
              {itemName : "New"     , itemHandler: null}
              ,{itemName : "Search" , itemHandler: null}  
            ] }/>

          <AppBarMenuList menuName="Items" menuItems={ [ 
                {itemName : "New"         , itemHandler: null}
                ,{itemName : "Search"     , itemHandler: null}
                ,{itemName : "Pricing"    , itemHandler: null}
                ,{itemName : "Categories" , itemHandler: null}                
            ] }/>

          <AppBarMenuList menuName="Customers" menuItems={ [
              {itemName : "New", itemHandler: null}
              ,{itemName : "Search", itemHandler: null}
            ] }/>

          <AppBarMenuList menuName="Configurations" menuItems={ [ 
            {itemName : "Parameters", itemHandler: null}
            ,{itemName : "User Management", itemHandler: null}
            ,{itemName : "Tax Management", itemHandler: null}
            ,{itemName : "Shipping methods", itemHandler: null}
            ] }/>

        </Hidden>  
        
        <Toolbar style={{ justifyContent: 'flex-end' ,flexGrow: '1' }}> 

          <AppBarMenuList menuName="Help" menuItems={ [
             {itemName : "User account", itemHandler: null}
             ,{itemName : "online help", itemHandler: null}
             ,{itemName : "Contact us", itemHandler: null}  
             ] }/>

          <AppBarMenuList menuName="JA" outline="no" menuItems={ [
             {itemName : "Logout", itemHandler: null}
             ] }/>

        </Toolbar>
       </Toolbar>
      </AppBar>

  );
}