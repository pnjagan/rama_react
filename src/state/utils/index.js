import merge from 'lodash/merge';
const inspect = require('object-inspect');

let deepStoreAssign = (objDest, ...objectList) => {
    /*
        This is lame , but I will soon improve on it to handle deep assignments. So a single function can merge data
        I also hope to support multi-level merge
    */
    return merge(objDest,...objectList);
}


let constants = {
    M_LOGIN_POST    : 'M_LOGIN_POST',
    R_LOGIN_META   : 'R_LOGIN_META'
}

let log = (...args) => {
    let str = '';
    for ( let item of args ) {
        let itype = typeof (item);
        switch (itype) {
            case 'object' :  str = str + inspect(item) ; break;
            case 'function' :  str = str + inspect(item) ; break;
            default:  str = str + item ; break;
        }
    }
    console.log(str);
}

export {deepStoreAssign,constants,log}