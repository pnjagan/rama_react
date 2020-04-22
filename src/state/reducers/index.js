
import { combineReducers } from 'redux';
import {deepStoreAssign as assignUtil,log} from '../utils';
import assign from 'lodash/assign';



const initValue = {
    data: {
      loggedUser:''
    },
    meta :{
        status: 'NOT_REQUESTED',
        message: ''
    }
  }

  const loginRed = (state = assign({},initValue), action) => {

    log('Reducer called with action :',action);


    if(action.type === 'R_LOGIN_META'){
      //  let newState = assign({},state)
         return assignUtil(
            {}
            ,state
            ,action.payload
         );
    } else {
      return state;
    }
  
    
  }
  


const rootReducer = combineReducers({
    loginKey : loginRed
 });
  
  export default rootReducer;