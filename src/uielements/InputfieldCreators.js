import React from 'react';
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';


import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Checkbox from '@material-ui/core/Checkbox';


import { Button} from '@material-ui/core';

import seqVal from './SequenceGen';

//size = small or mediem
//label
//placeholder
//inputLen = length of text field in chars

//Any function that returns JSX expressins should start with Capital letters.

import { withTheme } from '@material-ui/core/styles';


function BuildRRTextField(props) {

    let fieldProps = {};

    let textField = null;
    let tfLabel = null;
    
    if(props.size && (props.size==='small' || props.size === 'medium')){
        fieldProps.size = props.size;
    }
    if(props.id) {
        fieldProps.id = props.id;
    } else {
        fieldProps.id = 'RRTF-' + seqVal();
    }
    fieldProps.placeholder = props.placeholder;    
    

    tfLabel = <InputLabel > {props.label} </InputLabel>;

    textField =     <TextField 
    variant="outlined" 
    {...fieldProps}
    style = {{width : props.inputLen}}
    />;

    return [tfLabel,textField];

};


//size = small or mediem
//label
//inputLen = length of text field in chars

function BuildRRDateField(props) {

    let fieldProps = {};

    let dateField = null;
    let tfLabel = null;
    
    if(props.size && (props.size==='small' || props.size === 'medium')){
        fieldProps.size = props.size;
    }

    if(props.id) {
        fieldProps.id = props.id;
    } else {
        fieldProps.id = 'date-picker-inline-' + seqVal();
    }

    tfLabel = <InputLabel > {props.label} </InputLabel>;

    const [localDate, setLocalDate] = React.useState(new Date());
    
    //KeyboardDatePicker is built on MuiTextField    

    dateField =  <MuiPickersUtilsProvider utils={DateFnsUtils}>
	<KeyboardDatePicker
          disableToolbar
          variant="inline"	
          format="yyyy-MM-dd"
          margin="normal"
          id= {fieldProps.id}
          value={localDate}
          onChange={setLocalDate}
          style = {{width : props.inputLen}}
          size = {fieldProps.size}

        />
 </MuiPickersUtilsProvider>;

  return [tfLabel,dateField];

};


//size = small or mediem
//label
//inputLen = length of text field in chars
function BuildRRSelectField(props) {

    let fieldProps = {};

    let selectField = null;
    let tfLabel = null;
    
    if(props.size && (props.size==='small' || props.size === 'medium')){
        fieldProps.size = props.size;
    }

    if(props.id) {
        fieldProps.id = props.id;
    } else {
        fieldProps.id = 'select-' + seqVal();
    }
    

    tfLabel = <InputLabel > {props.label} </InputLabel>;

	const [localSelect, setLocalSelect] = React.useState('');

	const handleSelectChange = (event) => {
        setLocalSelect(event.target.value);
	};

    selectField =   <FormControl>
       <Select
           id= {fieldProps.id}
           value={localSelect}
           onChange={e => handleSelectChange(e)}
           style = {{width : props.inputLen}}
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

  return [tfLabel,selectField];

};

//label 
//ID
//default
function BuildRRCheckbox(props) {

    let fieldProps = {};

    let checkbox = null;
    let tfLabel = null;
    

    if(props.id) {
        fieldProps.id = props.id;
    } else {
        fieldProps.id = 'RRTF-' + seqVal();
    }

    

    tfLabel = <InputLabel > {props.label} </InputLabel>;

// inputProps={{ 'aria-label': 'checkbox with default color' }}
    checkbox = <Checkbox
        defaultChecked = { props.default}
        id = {fieldProps.id }
        color="default"
 
    />;

    return [tfLabel,checkbox];

};

//caption
function BuildButton(props) {
    return <Button variant="contained" >
  {props.caption}
</Button>;
}

function BC(props) {
    console.log(JSON.stringify(props.theme,null,2));
    return <div>{props.theme.direction}</div>;

}
  
let  TBC = withTheme(BC);

export {BuildRRTextField,BuildRRDateField,BuildRRSelectField,BuildRRCheckbox,BuildButton,TBC};