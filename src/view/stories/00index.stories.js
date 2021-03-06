import React from "react";
import { Button } from "@storybook/react/demo";
import {
  BuildRRTextField,
  BuildRRDateField,
  BuildRRSelectField,
  BuildRRCheckbox,
  BuildButton,
  TBC,
} from "../shared/LegacyInputfieldCreators";

import Box from "@material-ui/core/Box";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import {
  SingleColumnOfFieldLabel,
  DoubleColumnOfFieldLabel,
} from "../shared/LayoutHelper";

import { log } from "../../state/utils";

export default { title: "00 - INDEX" };

export const withText = () => <Button>Hello Button</Button>;

export const withTextDemo = () => <Button>Hello Button Demo</Button>;

export const withEmoji = () => (
  <Button>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);

/*
export const rrInputs = () => {
  return (
    <>
  <RRTextfield size='small' id='tf1' placeholder='eg. 04(...) or 02(...)' label='Phone'></RRTextfield> 
  <br></br>
  <RRTextfield size='medium' id='tf2' ></RRTextfield> 
  <br></br>


  <br></br>
  <TextField
      id="invoice-num" 
      placeholder = "A123"

      variant="outlined" 
      size='medium'
  />

  </>
  )

} ;
*/

/*
export const SingleRowOfFL = () => {
  let row1 = BuildRRTextField ({
    size : 'small',
    label : 'name',
    placeholder : 'ram ram',
    inputLen : '10em'
  });

  let row2 = BuildRRTextField ({
    size : 'small',
    label : 'pob',
    placeholder : 'bharatha',
    inputLen : '20em'    
  });  

  let row3 = BuildRRTextField ({
    size : 'small',
    label : 'CApital',
    placeholder : 'Ayodhya',
    inputLen : '15em'
  });  

  let row4 = BuildRRDateField ({
    size : 'small',
    label : 'Invoice Date',
    inputLen : '10em'
  });  

  let row5 = BuildRRDateField ({
    size : 'medium',
    label : 'Due Date',
    inputLen : '10em'
  });  

  let row6 = BuildRRSelectField ({
    size : 'small',
    label : 'Customers',
    inputLen : '12em',
    lov : [{id: 10 , value : 'Sri Ramajayam'},{id : 20, value : 'Sri Krishna'}]
  });  


  let row7 = BuildRRCheckbox({
    default : true,
    label : 'Is everything good?',
  });  
  //let row3 = [<button>Submit</button> , <button>Cancel</button>];


let FB = SingleColumnOfFieldLabel([
      row1
      ,row2
      ,row3
      ,row4
      ,row5
      ,row6
      ,row7
      , [
        BuildButton( {caption: 'Submit'}),BuildButton({caption:'Cancel'})
      ]
      , [<div>A</div>]
    ]);

return FB;

// return new SingleColumnForm([[FB,FB]]);
// return new SingleColumnForm( [new Button('Hare'),new Button('Krishna')] );
  
}


export const BoxDemo = () => { 
  let d= null;
  d = <Box border={3}> Hello BOX</Box>;
  //d = <Button border={2} >Hello button</Button>

  return d;
}


export const TBCDemo = () => {
return <TBC></TBC>
}


let theme = createMuiTheme({
  palette: {
    primary: {main: '#ff6600'},
    secondary: {main: '#ff00ff'},
  }
});

// export const themeDemo = () => <ThemeProvider theme={theme}>
// <FormBuilderDemo />
// </ThemeProvider>;


export const DoubleRowOfFL = () => {
  let row1 = BuildRRTextField ({
    size : 'small',
    label : 'name',
    placeholder : 'ram ram',
    inputLen : '10em'
  });

  let row2 = BuildRRTextField ({
    size : 'small',
    label : 'pob',
    placeholder : 'bharatha',
    inputLen : '20em'    
  });  

  let row3 = BuildRRTextField ({
    size : 'small',
    label : 'CApital',
    placeholder : 'Ayodhya',
    inputLen : '15em'
  });  

  let row4 = BuildRRDateField ({
    size : 'small',
    label : 'Invoice Date',
    inputLen : '10em'
  });    

  let DC = DoubleColumnOfFieldLabel([[...row1,...row2],[...row3,...row4]]);  

  return DC;
}
*/
