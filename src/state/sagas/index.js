

import {callAPI} from './axiosHelper';
import { put, takeLatest, all ,select} from 'redux-saga/effects';
import {log} from '../utils';


function* loginPost(action) {

  log('action in SAGA worker:',action);

    yield put({ type: "R_LOGIN_META", payload: {
      data : {
        loggedUser : action.payload.userLogin
      },
      meta :{
          status: 'FETCH_IN_PROGRESS',
          message: 'login initiated'
      }
    } });

    const data = yield callAPI(
            'http://localhost:3100/login'
            ,'post'
            ,{...action.payload }
    );

     log('Response in Saga worker:',data);

     if(data.status ===200) {
        localStorage.setItem('siaJWT',data.serverResponse.jwtToken);

        log('JWT set',localStorage.getItem('siaJWT'));

        yield put({ type: "R_LOGIN_META", payload: {
          meta :{
              status: 'READY',
              message: 'User logged in'
          }
        } });
     } else {
        yield put({ type: "R_LOGIN_META", payload: {
        meta :{
            status: 'FETCH_FAILED',
            message: 'Invalid login, try again'
        }
        } }); 
     }


}

function* loginWatcher() {
     yield takeLatest('M_LOGIN_POST', loginPost)
}
export default function* rootSaga() {
   yield all([
     loginWatcher()
   ]);
}