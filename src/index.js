import React from 'react';
import ReactDOM from 'react-dom';

import App from './view/App';

import 'typeface-roboto'; 

import {BrowserRouter as Router } from 'react-router-dom'    





import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

import  rootReducer  from "./state/reducers";
import  rootSaga  from "./state/sagas";

let log = console.log;

//import * as serviceWorker from './serviceWorker';





//being the entry point, importing roboto



function WrappedApp(props) {

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// dev tools middleware
// const reduxDevTools =  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

log('Root reducer');
log(rootReducer,sagaMiddleware);
// create a redux store with our reducer above and middleware
let store = createStore(
	rootReducer
	,applyMiddleware(sagaMiddleware)
);

// run the saga
sagaMiddleware.run(rootSaga);
	
	return ( <Provider store={store}>
				<Router> 
					<App /> 
				</Router>  
			</Provider>
	);
}

ReactDOM.render( <WrappedApp /> , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();


