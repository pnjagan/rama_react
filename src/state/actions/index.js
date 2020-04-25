import {constants} from '../utils';

//Takes a linear object values and puts into a structure.
/* 

//meta attributes are prefixed with values meta_
//meta_ is stripped to build the meta part of the payload

{ 
  type: __ 
  payload: {
    data: {
      ...
    },
    meta: {
      ...
    }
  }
}

*/

const actionTypes = {
  M_LOGIN_POST    : 'M_LOGIN_POST',
  R_LOGIN_META   : 'R_LOGIN_META',

  M_LOGOUT_META  : 'M_LOGOUT_META',
  R_LOGOUT_META  : 'R_LOGOUT_META',

  // M_NEW_LOGIN    : 'M_NEW_LOGIN',
}



function makeActionCreator(type) {
  return function(paramObject) {

    const action = { type }

    action.payload = {
      data: {},
      meta: {}
    }

    
    Object.getOwnPropertyNames(paramObject).forEach((arg, index) => {
      if(arg.startsWith('meta_')){
        action.payload.meta[arg.slice(5)] = paramObject[arg];
      } else {
        action.payload.data[arg] = paramObject[arg];
      }
    });

    return action
  }
}

export {actionTypes};

export const mLoginPost   = makeActionCreator(actionTypes.M_LOGIN_POST);
export const rLoginMeta   = makeActionCreator(actionTypes.R_LOGIN_META);

export const mLogoutMeta  =  makeActionCreator(actionTypes.M_LOGOUT_META);
export const rLogoutMeta  =  makeActionCreator(actionTypes.R_LOGOUT_META);
