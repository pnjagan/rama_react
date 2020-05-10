import merge from "lodash/merge";
const inspect = require("object-inspect");

// let deepStoreAssign = (objDest, ...objectList) => {
//   /*
//         This is lame , but I will soon improve on it to handle deep assignments. So a single function can merge data
//         I also hope to support multi-level merge
//     */
//   return merge(objDest, ...objectList);
// };

export const log = (...args) => {
  let str = "";
  for (let item of args) {
    let itype = typeof item;
    switch (itype) {
      case "object":
        str = str + inspect(item);
        break;
      case "function":
        str = str + inspect(item);
        break;
      default:
        str = str + item;
        break;
    }
  }
  console.log(str);
};

export const isBlank = (text) => {
  //true is null or undefined or ''

  let retVal = false;

  if (text == null) {
    retVal = true;
  } else if (text === "") {
    retVal = true;
  }
  return retVal;
};
