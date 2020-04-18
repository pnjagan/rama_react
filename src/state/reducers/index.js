
import { combineReducers } from 'redux';
import {deepStoreAssign as assignUtil} from '../utils';
import assign from 'lodash/assign';


const initValue = {
    data: {},
    meta :{
        status: 'NOT_REQUESTED',
        message: ''
    }
  }

  const userRed = (state = assign({},initValue), action) => {

    if(action.type == 'R_LOGIN_META'){

      //  let newState = assign({},state)
         return assignUtil(
            {}
            ,state
         );
    }
  
    return state
  }
  


const rootReducer = combineReducers({
    userKey : userRed
 });
  
  export default rootReducer;