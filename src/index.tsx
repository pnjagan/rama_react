import React from "react";
import ReactDOM from "react-dom";

import App from "./view/App";

import "typeface-roboto";

import { BrowserRouter as Router } from "react-router-dom";

import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

import { rootReducer, rootSaga } from "./state/ducks";

import createReduxPromiseListener from "redux-promise-listener";
import { CssBaseline } from "@material-ui/core";

let log = console.log;

//import * as serviceWorker from './serviceWorker';
//being the entry point, importing roboto

// const DisplayContext = React.createContext("display");
export const reduxPromiseListener = createReduxPromiseListener();

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

function WrappedApp() {
  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware, reduxPromiseListener.middleware];
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // const composeEnhancers = compose;

  log("Root reducer");
  log(rootReducer, sagaMiddleware);
  // create a redux store with our reducer above and middleware
  let store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  // run the saga
  sagaMiddleware.run(rootSaga);

  return (
    <Provider store={store}>
      <Router>
        <CssBaseline />
        <App />
      </Router>
    </Provider>
  );
}

ReactDOM.render(<WrappedApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
