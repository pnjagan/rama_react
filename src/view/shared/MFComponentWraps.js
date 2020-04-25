import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import { Button,Link,Typography} from '@material-ui/core';
import seqVal from './SequenceGen';
import { makeStyles } from '@material-ui/core/styles';

//Any function that returns JSX expressins should start with Capital letters.

import { withTheme } from '@material-ui/core/styles';
/*
#tbr - to be revised

Purpose of this library
1)Bring uniformity in how the fields are used through out the webapp and avoid copy paste of defaults
2)Default field sizes based on screen size - NOT STARTED #tbr
3)Uniform handlers #tbr
4)final-form wrappers #tbr

*/



/*

Suported
--------
inputLen (number of characters)
type
size (small medium large)
id
placeholder
label

*/
// <TextField id="outlined-basic" label="Outlined" variant="outlined" />

function RRTextFieldBuilder(props) {

    this.props = props;
    this.textValue = '';
    
    this.getComponent = () => {
        let fieldProps = {};

        let textField = null;
    
        //small, medium, large
        if(props.size){
            fieldProps.size = props.size;
        }
        if(props.id) {
            fieldProps.id = props.id;
        } else {
            fieldProps.id = 'RRTF-' + seqVal();
        }
        fieldProps.placeholder = props.placeholder;
    
        if(props.type){
            fieldProps.type= props.type;
        }
        
        if(props.label){
            fieldProps.label= props.label;
        }    
    
        textField = <TextField 
        variant="outlined" 
        {...fieldProps}
        style = {{width : props.inputLen}}
        onChange = {(e)=>{
            this.textValue = e.target.value;
        }}
        />;
    
        return textField;
    }

}

function RRTextField(props) {

    let fieldProps = {};

    let textField = null;

    
    //small, medium, large
    if(props.size){
        fieldProps.size = props.size;
    }
    if(props.id) {
        fieldProps.id = props.id;
    } else {
        fieldProps.id = 'RRTF-' + seqVal();
    }
    fieldProps.placeholder = props.placeholder;

    if(props.type){
        fieldProps.type= props.type;
    }
    
    if(props.label){
        fieldProps.label= props.label;
    }    

    textField =     <TextField 
    variant="outlined" 
    {...fieldProps}
    style = {{width : props.inputLen}}
    />;

    return textField;

};

/*
Suported
--------
inputLen (number of characters)
size (small medium large) 
id
label

*/

function RRDateField(props) {

    let fieldProps = {};
    let dateField = null;
    // let tfLabel = null;

    if(props.size){
        fieldProps.size = props.size;
    }

    if(props.id) {
        fieldProps.id = props.id;
    } else {
        fieldProps.id = 'date-picker-inline-' + seqVal();
    }

    if(props.label) {
        fieldProps.label = props.label;
    }

    //Adjust label size based on screen? - #tbr
    const [localDate, setLocalDate] = React.useState(new Date());
    //KeyboardDatePicker is built on MuiTextField    

    dateField =  <MuiPickersUtilsProvider utils={DateFnsUtils}>
	    <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="yyyy-MM-dd"
          margin="normal"
          value={localDate}
          onChange={setLocalDate}
          style = {{width : props.inputLen}}
          {...fieldProps}
        />
 </MuiPickersUtilsProvider>;

  return dateField;
}


//size = small or medium
//label
//inputLen = length of text field in chars
//lov - values to show
function RRSelectField(props) {

    let fieldProps = {};

    let selectField = null;
    let selectLabel = null;
    
    if(props.size){
        fieldProps.size = props.size;
    }

    if(props.id) {
        fieldProps.id = props.id;
    } else {
        fieldProps.id = 'select-' + seqVal();
    }
    
    let labelID = 'select-label-' + seqVal();
    selectLabel = <InputLabel shrink id={labelID}>
    {props.label}
    </InputLabel>;

	const [localSelect, setLocalSelect] = React.useState('');

	const handleSelectChange = (event) => {
        setLocalSelect(event.target.value);
	};

    selectField =  
    
    <FormControl>
        {selectLabel}
       <Select

           value={localSelect}
           onChange={e => handleSelectChange(e)}
           style = {{width : props.inputLen}}
           {...fieldProps}
           labelId = {labelID}
       >
           {
               props.lov.map( (currVal,ind) => {
                        return (
                            <MenuItem key={ind} value={currVal.id}> {currVal.value} </MenuItem>
                        );
                    }
               )
           }
       </Select>

       </FormControl>;

  return selectField;
};

//label 
//default
function RRCheckbox(props) {

    let fieldProps = {};
    if(props.label){
        fieldProps.label = props.label;
    }

    const [state, setState] = React.useState({
        checkedValue : props.default
    });

    let fieldName = 'checkbox-' + seqVal();

    const handleChange = (event) => {
        setState({ checkedValue: event.target.checked });
    };

    let checkbox = <FormControlLabel
        control={
        <Checkbox
            checked={state.checkedValue}
            onChange={handleChange}
            name={fieldName}
            color="primary"
        />
        }
        label={fieldProps.label}
    />;

    return checkbox;

};

//caption
function RRButton(props) {
    return <Button variant="contained" >
        {props.caption}
    </Button>;
}


function RRButtonBuilder(props) {

    this.props = props;
    //onClickHandler to be handled

    this.getComponent = () => {
        // let fieldProps = {};

        let buttonField = <Button variant="contained" onClick={props.clickHandler} >
                            {props.caption}
                        </Button>;
    
       
    
        return buttonField;
    }

}

const linkStyle = makeStyles(theme=>{return {
    root: {
        padding : theme.spacing(1),
        backgroundColor : theme.palette.grey[100],
        margin: 0,
        borderRadius: '.5rem',
        '&:hover': {
            backgroundColor : theme.palette.grey[200]
        }
    }
    }
  });

//props.text
function RRLink(props) {
    const preventDefault = event => event.preventDefault();    

    let classes = linkStyle();

    return   <Link  href="#" onClick={preventDefault} >
        <Typography className={classes.root}> {props.text} </Typography>
  </Link>  
}

// function BC(props) {
//     console.log(JSON.stringify(props.theme,null,2));
//     return <div>{props.theme.direction}</div>;
// }
  
// let  TBC = withTheme(BC);

export {
        RRTextField
        ,RRDateField
        ,RRSelectField
        ,RRCheckbox
        ,RRButton
        ,RRLink
        ,RRTextFieldBuilder
        ,RRButtonBuilder
    }