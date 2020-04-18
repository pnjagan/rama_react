import assign from 'lodash/assign';

let deepStoreAssign = (objDest, objProp) => {
    /*
        This is lame , but I will soon improve on it to handle deep assignments. So a single function can merge data
        I also hope to support multi-level merge
    */
    return assign(objDest,objProp);
}


let constants = {
    M_LOGIN_POST    : 'M_LOGIN_POST',
    R_LOGIN_META   : 'R_LOGIN_META'
}


export {deepStoreAssign,constants}