import {constants} from '../utils';

function makeActionCreator(type, ...argNames) {
  return function(...args) {
    const action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}



export const mLoginPost   = makeActionCreator(constants.M_LOGIN_POST, 'payload');
export const rLoginMeta  = makeActionCreator(constants.M_LOGIN_META, 'payload');
