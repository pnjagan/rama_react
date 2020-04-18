import {deepStoreAssign,constants} from '../utils';
function makeActionCreator(type, ...argNames) {
  return function(...args) {
    const action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}



export const mLoginGet   = makeActionCreator(constants.M_LOGIN_GET, 'payload');
export const rLoginMeta  = makeActionCreator(constants.M_LOGIN_META, 'payload');
