
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
          CssBaseline
          ,Typography
          ,Container
          ,Paper
          ,TextField
          ,Button
          // ,Link
          ,Box
          //////////////
          ,AppBar
          ,Toolbar
          ,Hidden
          ,IconButton
      } from '@material-ui/core';

import { Route, Link, Switch} from 'react-router-dom'      

 

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';

import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';      

import MenuIcon from '@material-ui/icons/Menu';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ContentIndex from './ContentIndex'



import ButtonAppBar from './ButtonAppBar';
import Invoice from './Invoice';

import { useHistory } from "react-router-dom";

import {PathFunctionMap as CU} from './ConstantsUtils';


const useStyles = makeStyles(theme => ({
  }
));


function mapToContent(path) {

  console.log('-path check-');
  console.log(path);
  console.log(CU.INV_CREATE.path);

  switch(path) {
    case CU.INV_CREATE.path : return <Invoice />;
     default : return <ContentIndex/>;
  }

}



function MainPage(props) {

  const classes = useStyles();
  let history = useHistory();

  /*
    initialize and direct to appropriate URL if user is not signed-in.

  */

  const preventDefault = event => event.preventDefault();

  return (


    <React.Fragment>
      <CssBaseline />

      <ButtonAppBar />
      {mapToContent(history.location.pathname)}
    
    </React.Fragment>
  );
};


export default MainPage;