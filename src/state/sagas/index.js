

import {callAPI} from './axiosHelper';
import { put, takeLatest, all ,select} from 'redux-saga/effects';
import {log} from '../utils';
import {rLoginMeta,rLogoutMeta,actionTypes} from '../actions';


function* loginPost(action) {

    log('action in SAGA worker:',action);
/*
    yield put({ type: "R_LOGIN_META", payload: {
      data : {
        loggedUser : action.payload.userLogin
      },
      meta :{
          status: 'FETCH_IN_PROGRESS',
          message: 'login initiated'
      }
    } }
    );
*/

    //Use action creators all the time
    yield put(rLoginMeta({
      loggedUser : action.payload.data.userLogin,
      meta_status : 'FETCH_IN_PROGRESS',
      meta_message : 'login initiated'
    }));

    const data = yield callAPI(
            'http://localhost:3100/login'
            ,'post'
            , {...action.payload.data }
    );

     log('Response in Saga worker:',data);

     if(data.status ===200) {

        log('Full data :',data);
        localStorage.setItem('siaJWT'       ,data.serverResponse.jwtToken);
        localStorage.setItem('siaUserLogin' ,data.serverResponse.userLogin);
        //UserName not be stored in localStorage

        log('JWT set',localStorage.getItem('siaJWT'));

        /*
        yield put({ type: "R_LOGIN_META", payload: {
          data : {
            loggedUser : data.serverResponse.userLogin,
            loggedUserName : data.serverResponse.userName
          },          
          meta :{
              status: 'READY',
              message: 'User logged in'
          }
        } });
        */

       yield put(rLoginMeta({
          loggedUser     : data.serverResponse.userLogin,
          loggedUserName : data.serverResponse.userName,
          meta_status    : 'READY',
          meta_message   : 'User logged in'
       }));

     } else {
        /*
        yield put({ type: "R_LOGIN_META", payload: {
        meta :{
            status: 'FETCH_FAILED',
            message: 'Invalid login, try again'
        }
        } }); 
        */

        yield put (rLoginMeta({
          meta_status: 'FETCH_FAILED',
          meta_message: 'Invalid login, try again'
        }));

     }

}

function* logoutMeta(action) {

  //rLogoutMeta

  /*
  yield put(
    { 
    type: "R_LOGOUT_META",
    payload: {
      meta :{
          status: 'NOT_REQUESTED',
          message: ''
      },
      data : {
        loggedUser : '',
        loggerUserName : ''
      },      
    } 
  }
  ); 
  */

  yield put(rLogoutMeta({
    loggedUser : '',
    loggerUserName : '',
    meta_status: 'NOT_REQUESTED',
    meta_message: ''    
  }));

  //UserName not be stored in localStorage
  localStorage.removeItem('siaJWT');
  localStorage.removeItem('siaUserLogin');

}

function* loginWatcher() {
     yield all([
      takeLatest(actionTypes.M_LOGIN_POST, loginPost),
      takeLatest(actionTypes.M_LOGOUT_META,logoutMeta)
     ]);
}
export default function* rootSaga() {
   yield all([
     loginWatcher()
   ]);
}