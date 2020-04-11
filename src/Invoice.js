
import React from 'react';

import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
// import { useHistory } from "react-router-dom";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import InputLabel from '@material-ui/core/InputLabel';

import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
  } from '@material-ui/pickers';

  import FormHelperText from '@material-ui/core/FormHelperText';
  import FormControl from '@material-ui/core/FormControl';
import { Typography , Button} from '@material-ui/core';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const classes = {}

function FormRow(props) {

	let invoiceLines = props.data;
	let handleLineTable = props.handler;
	let rowNum = props.rowNum;

    return (
      <React.Fragment>
        <Grid item xs={4}>
			<Select
				id= {`invoice-status-select ${rowNum}`}
				value={invoiceLines[rowNum].item}
				onChange={ e=> {handleLineTable(rowNum,'ITEM', e.value)}}
			>
				<MenuItem value={1}>ITEM 1</MenuItem>
				<MenuItem value={2}>ITEM 2</MenuItem>
				<MenuItem value={3}>ITEM 3</MenuItem>
			</Select>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>Qty</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>Price</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>TAX</Paper>
        </Grid>			
        <Grid item xs={2}>
          <Paper className={classes.paper}>Total</Paper>
        </Grid>		
		
      </React.Fragment>
    );
  }


export default function Invoice(props){

	const [invDate, setInvDate] = React.useState(new Date());
	const [invTerms, setInvTerms] = React.useState('');
	const [invStatus, setInvStatus] = React.useState('');	
	const [invCustomer, setInvCustomer] = React.useState('');		
	const [invoiceLines, setInvoiceLines] = React.useState([{},{}]);


	const handleSelectChange = (f,event) => {

		switch(f) {
			case 'INVOICE-STATUS' : setInvStatus(event.target.value);  break;
			case 'INVOICE-TERMS' : setInvTerms(event.target.value); break;
		}

	  };

	const handleLineTable = (rowNum, updColumn, value) => {
		setInvoiceLines(
			oldInvLine => {
				oldInvLine[rowNum][updColumn] = value;
				
				return oldInvLine;
			}
		);
	}

	return (
		<>
	<h1> New Invoice</h1>
	
	<InputLabel id="invoice-num-label">Invoice Number</InputLabel>
	<TextField id="invoice-num" label="Invoice #" labelId="invoice-num-label" variant="outlined" />

	<MuiPickersUtilsProvider utils={DateFnsUtils}>
	<KeyboardDatePicker
          disableToolbar
          variant="inline"	
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Invoice Date"
          value={invDate}
          onChange={setInvDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
 </MuiPickersUtilsProvider>

 <Typography>
	 Due date: 18-Mar-2020
 </Typography>

 <FormControl 	>
	 {/**formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }, */}
 		<InputLabel id="invoice-status-label">Invoice status</InputLabel>
		<Select
			labelId="invoice-status-label"
			id="invoice-status-select"
			value={invTerms}
			onChange={e => handleSelectChange('INVOICE-STATUS',e)}
		>
          <MenuItem value={10}>Open</MenuItem>
          <MenuItem value={20}>Closed</MenuItem>
          <MenuItem value={30}>Cancelled</MenuItem>
        </Select>

		</FormControl>	

 <br></br>

		<FormControl 	>
	 {/**formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }, */}
 		<InputLabel id="customer-label">Customer</InputLabel>
		<Select
			labelId="customer-label"
			id="customer-select"
			value={invCustomer}
			onChange={e => handleSelectChange('INV-CUSTOMER',e)}
		>
          <MenuItem value={10}>Anant Computers</MenuItem>
          <MenuItem value={20}>Ram general stores</MenuItem>
          <MenuItem value={30}>Krishna sweets</MenuItem>
        </Select>

		</FormControl>		
		<br>
		</br>

		<FormControl 	>
	 {/**formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }, */}
 		<InputLabel id="payment-terms-label">Payment Terms</InputLabel>
		<Select
			labelId="payment-terms-label"
			id="payment-terms-select"
			value={invTerms}
			onChange={e => handleSelectChange('INV-TERMS',e)}
		>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>

		</FormControl>	
		<br></br>
		<br></br>
		<br></br>



		<Grid container spacing={1}>
		<Grid container item xs={12} spacing={3}>
          <FormRow data={invoiceLines} handler={handleLineTable} rowNum={0}/>
        </Grid>

		<Grid container item xs={12} spacing={3}>
		<FormRow data={invoiceLines} handler={handleLineTable} rowNum={1}/>
        </Grid>

		</Grid>
		<br></br>
		<br></br>

		<TextareaAutosize aria-label="additional-notes" placeholder="NOtes" />

		<Typography>
			LIne Total: 1000 AUD
		</Typography>

		<TextField id="DiscountAMount" label="Discount AMount" variant="standard" />

		<Typography>
			Discounted Total: 980 AUD
		</Typography>

		<Typography>
			Total taxes: 40 AUD
		</Typography>		

		<Typography>
			Shipping/handling charges (incl tax): 40 AUD
		</Typography>		


		<Typography>
			Net amount to be paid: 1300 AUD
		</Typography>				

		<Button variant="contained">Save</Button>

		<Button variant="contained">Cancel</Button>

	</>
	);
}