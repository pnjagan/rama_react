

import {callAPI} from './axiosHelper';
import { put, takeLatest, all ,select} from 'redux-saga/effects';
let log = console.log;


function* loginGet() {
  const json = yield callAPI(
          '/signin'
          ,{
               userLogin : "sriram",
               password : "nosecret"
          }
     )
     .then(response => response.json());    

     log('Response ....');
     log(json);

     yield put({ type: "R_LOGIN_META", payload: json });
}

function* loginWatcher() {
     yield takeLatest('M_LOGIN_POST', loginGet)
}
export default function* rootSaga() {
   yield all([
     loginWatcher()
   ]);
}