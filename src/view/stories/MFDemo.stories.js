import React from "react";
import { Button } from "@storybook/react/demo";
import {
  RRTextField,
  RRDateField,
  RRSelectField,
  RRCheckbox,
  RRButton,
  RRLink,
} from "../shared/MFComponentWraps";
import LoginPage from "../pages/LoginPage";

import Box from "@material-ui/core/Box";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import {
  SingleColumnForm,
  DoubleColumnForm,
  SingleColumnOfMFF,
} from "../shared/LayoutHelper";

import { RTextField } from "../shared/RComponents";

export default { title: "MF DEMO" };

export const withTextDemo = () => <Button>Hello Button Demo</Button>;

export const LoginPageDemo = () => <LoginPage />;

export const SCFF = () => {
  let row1 = RRTextField({
    size: "small",
    label: "name",
    placeholder: "ram ram",
    inputLen: "10em",
  });

  let row2 = RRTextField({
    size: "small",
    label: "pob",
    placeholder: "bharatha",
    inputLen: "20em",
  });

  let row3 = RRTextField({
    size: "small",
    label: "CApital",
    placeholder: "Ayodhya",
    inputLen: "15em",
  });

  let row4 = RRDateField({
    size: "small",
    label: "Invoice Date",
    inputLen: "10em",
  });

  let row5 = RRSelectField({
    size: "small",
    label: "Customers",
    inputLen: "12em",
    lov: [
      { id: 10, value: "Sri Ramajayam" },
      { id: 20, value: "Sri Krishna" },
    ],
  });

  let row6 = RRCheckbox({
    default: true,
    label: "Is everything good?",
  });
  //let row3 = [<button>Submit</button> , <button>Cancel</button>];

  let mfLayout = SingleColumnOfMFF([row1, row2, row3, row4, row5, row6]);

  return mfLayout;
};

export const SCFF2 = () => {
  /*
  let row1 = RRTextField ({
    size : 'small',
    label : 'name',
    placeholder : 'ram ram',
    inputLen : '10em'
  });

  
  let row2 = RRTextField ({
    size : 'small',
    label : 'pob',
    placeholder : 'bharatha',
    inputLen : '20em'    
  });  

  let row3 = RRTextField ({
    size : 'small',
    label : 'CApital',
    placeholder : 'Ayodhya',
    inputLen : '15em'
  });  

  let row4 = RRDateField ({
    size : 'small',
    label : 'Invoice Date',
    inputLen : '10em'
  });  
  

  let row5 = RRSelectField ({
    size : 'small',
    label : 'Customers',
    inputLen : '12em',
    lov : [{id: 10 , value : 'Sri Ramajayam'},{id : 20, value : 'Sri Krishna'}]
  });  


  let row6 = RRCheckbox({
    default : true,
    label : 'Is everything good?',
  });  
  //let row3 = [<button>Submit</button> , <button>Cancel</button>];

  let mfLayout =   SingleColumnOfMFF (
    [row1,row2,row3,row4,row5,row6]
  );

  return mfLayout;
  */

  /*
    let row1 = RRTextField ({
      size : 'small',
      label : 'name',
      placeholder : 'ram ram',
      inputLen : '10em'
    });
    */
  return [
    <RRTextField
      size="small"
      label="name"
      placeholder="ram ram"
      inputLen="10em"
    />,
    RRTextField({
      size: "small",
      label: "name",
      placeholder: "ram ram",
      inputLen: "10em",
    }),
  ];
};

// export const FormMFDemo = () => {

//   let row1 = RRTextField ({
//     size : 'small',
//     label : 'name',
//     placeholder : 'ram ram',
//     inputLen : '10em'
//   });

//   let row2 = RRTextField ({
//     size : 'small',
//     label : 'pob',
//     placeholder : 'bharatha',
//     inputLen : '20em'
//   });

//   let row3 = RRTextField ({
//     size : 'small',
//     label : 'CApital',
//     placeholder : 'Ayodhya',
//     inputLen : '15em'
//   });

//   let row4 = RRDateField ({
//     size : 'small',
//     label : 'Invoice Date',
//     inputLen : '10em'
//   });

//   let row5 = RRSelectField ({
//     size : 'small',
//     label : 'Customers',
//     inputLen : '12em',
//     lov : [{id: 10 , value : 'Sri Ramajayam'},{id : 20, value : 'Sri Krishna'}]
//   });

//   let row6 = RRCheckbox({
//     default : true,
//     label : 'Is everything good?',
//   });
//   //let row3 = [<button>Submit</button> , <button>Cancel</button>];

//   let FB = SingleColumnForm([
//       [row1]
//       ,[row2]
//       ,[row3]
//       ,[row4]
//       ,[row5]
//       ,[row6]
//   ]);

//   return FB;
//   // return new SingleColumnForm([[FB,FB]]);
//   // return new SingleColumnForm( [new Button('Hare'),new Button('Krishna')] );

// }

export const SCFF3 = () => {
  return <RTextField size="small" label="name1" placeholder="ram ram" />;
};
