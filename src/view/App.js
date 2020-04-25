import React, { useState, useEffect} from 'react';

import { useDispatch ,useSelector} from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {CssBaseline,Typography,Container,Paper,TextField,Button,Box} from '@material-ui/core';
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import WIP from './pages/WIP'
import {PathFunctionMap as CU} from './shared/ConstantsUtils';
import { Route, Switch} from 'react-router-dom'     
import {log} from '../state/utils'
import { useHistory,useLocation,Redirect} from "react-router-dom";

import {mLoginPost} from '../state/actions';
// SA uses following convention
// /module/function?PARAM=VALUE
// All the info other than module and function have to be incorporated as a parameter
// history.location.pathname contains the fullpath ..
// history.location.search will contain the query string ..

// match.params.function will contain the function..

/*
All modules are redircted to the main page for now
*/
const pathsToMain = Object.entries(CU).reduce ( (newList,currEntry) => {
		// console.log('newList');
		// console.log(newList );
		return (currEntry[1].func !== "" && !newList.includes(currEntry[1].module)? newList.concat(currEntry[1].module) : [...newList]);
	} 
	,[]
).map(val => `/${val}/:function*`);


function App(props) {

  log('PROPS in APPS ',props);
  const history = useHistory();
  const location = useLocation();


  const loginState = useSelector(
    (state) => state.loginKey
  );  

  let dispatch = useDispatch();

  useEffect(
    ()=>{
      log('inside use EFFECT');
      if (
        (
          loginState.data.loggedUser == null || loginState.data.loggedUser=='')
        &&
          localStorage.getItem('siaUserLogin') !=null && localStorage.getItem('siaUserLogin') !='' 
      )  {
        dispatch(mLoginPost({
          userLogin: localStorage.getItem('siaUserLogin'),
          jwtToken: localStorage.getItem('siaJWT')
        }));        
      }
    },[]
  );



  // log(typeof(a));
  log('token :' , localStorage.getItem('siaJWT'));


  // Handle the JUNK value case
  
  log('INvaid LOGIN check',  (
      (localStorage.getItem('siaJWT') == null || localStorage.getItem('siaUserLogin') ==null) 
    ) //localStorage has no Valid Value
    , (
      loginState.meta.status === 'FETCH_FAILED' || loginState.meta.status === 'NOT_REQUESTED'
    ) //To Initiate a new LOGIN
    //Exclusion pages
    , (location.pathname !==CU.SIGN_IN.path) 
    , (location.pathname !==CU.REGISTER.path)
  );

  if(
    (
      (localStorage.getItem('siaJWT') == null || localStorage.getItem('siaUserLogin') ==null) 
    ) //localStorage has no Valid Value
    && (
      loginState.meta.status === 'FETCH_FAILED' || loginState.meta.status === 'NOT_REQUESTED'
    ) //To Initiate a new LOGIN
    //Exclusion pages
    && (location.pathname !==CU.SIGN_IN.path) 
    && (location.pathname !==CU.REGISTER.path)
  ) {

    log('Invalid SIGN IN DETAILS, push to Sign in page');
    return <Redirect to={CU.SIGN_IN.path} /> ;
    // history.push(CU.SIGN_IN.path);
  }

//If Path is SignIN or Registration, no need to check LOGIN STATUS
  if( 
      (location.pathname === CU.SIGN_IN.path) 
        || 
      (location.pathname === CU.REGISTER.path)
  ) {
    return (
      <Switch>
        <Route path={CU.SIGN_IN.path}  component={LoginPage} exact />
        <Route path={CU.REGISTER.path} component={LoginPage} exact />  
      </Switch>
    );
  }

  
  if(loginState.meta.status === 'READY') {
    return (
      <Switch>
          <Route path={CU.HOME.path} component={MainPage}  exact />
          {/*********************************************/}
          <Route path={ pathsToMain} component={MainPage} exact />
          <Route component={WIP}  />
      </Switch>
    );
  } else if(loginState.meta.status === 'FETCH_IN_PROGRESS') {
    return 'Please wait, login in-progress';
  } else {
    log('INSIDE UNEXPECTED PROBLEM',loginState)
    return 'Unexpected condition, wait to resolve or contact admin!';
  }

}

export default App;
