
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

import ContentIndex from '../components/ContentIndex'



import AppToolBar from '../components/AppToolBar';
import Invoice from './Invoice';

import { useHistory } from "react-router-dom";

import {PathFunctionMap as CU} from '../shared/ConstantsUtils';
import {log} from '../../state/utils';
import WIPPage from './WIP'

const useStyles = makeStyles(theme => ({
  }
));


function mapToContent(path) {

  log('-path check-',path);

  switch(path) {
    case CU.HOME.path : return <ContentIndex />;
     default : return <WIPPage/>;
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

      <AppToolBar />

      
      {mapToContent(history.location.pathname)}
    
    </React.Fragment>
  );
};


export default MainPage;