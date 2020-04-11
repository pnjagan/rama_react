import React from 'react';


import { makeStyles } from '@material-ui/core/styles';
import {CssBaseline,Typography,Container,Paper,TextField,Button,Box} from '@material-ui/core';
import LoginPage from './LoginPage'
import MainPage from './MainPage'
import WIP from './WIP'
import {PathFunctionMap as CU} from './ConstantsUtils';
import { Route, Switch} from 'react-router-dom'     

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

  return (

  	<Switch>
        <Route path={CU.SIGN_IN.path}  component={LoginPage} exact />
        <Route path={CU.REGISTER.path} component={LoginPage} exact />   
        <Route path={CU.HOME.path}     component={MainPage}  exact />
        {/*********************************************/}
        <Route path={ pathsToMain} component={MainPage} exact />
        <Route component={WIP}  />
  	</Switch>

  );
}

export default App;
