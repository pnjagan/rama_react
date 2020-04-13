
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {CssBaseline,Typography,Container,Paper,TextField,Button,Link,Box} from '@material-ui/core';
import {SingleColumnForm,DoubleColumnForm}  from './uielements/FormBuilder';
import {BuildRRTextField,BuildRRDateField,BuildRRSelectField,BuildRRCheckbox,BuildButton,BuildLink} from './uielements/InputfieldCreators';

let log = console.log;

const useStyles = makeStyles(theme => ({
  mainCanvas: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',    
    alignItems: 'flex-start',  
  },
  loginPaper: {
    //  width: '400px',
    //  height: '300px',
    margin: '10vh 0 0 0'
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',    
    alignItems: 'center', 
    padding: '.7vh'
  },    
  // defaultElement: {
  //     margin: '1vh'
  //   },      
  loginLink: {
    margin: '0',
    fontSize : '1rem'
  },       
  }
));  

function LoginPage() {

  const classes = useStyles();

  const preventDefault = event => event.preventDefault();

let row0 =<Typography variant="h5" className={classes.defaultElement} >
SriRam Invoice
</Typography>;

row0 = [row0];

  let row1 = BuildRRTextField ({
    size : 'small',
    label : 'Username :',
    placeholder : '',
    inputLen : '15rem'
  });

  let row2 = BuildRRTextField ({
    size : 'small',
    label : 'Password',
    placeholder : '',
    inputLen : '15rem',
    type: "password"
  });  




  let row3 = [BuildButton ({caption: 'Login'})];  

  let row4 = [BuildLink({text:<Typography className={classes.loginLink}>Forgot password</Typography>})];
  let row5 = [BuildLink({text:<Typography className={classes.loginLink}>New user</Typography>})];


  let scf = SingleColumnForm([row0,row1,row2,row3,row4,row5]);

  return (
    <React.Fragment>
      <CssBaseline />
      {/* {scf} */}
   

         <Box className={classes.mainCanvas}>
          <Paper className={classes.loginPaper}>
            <form noValidate autoComplete="off">
              <Box className={classes.loginForm}>
                {scf}           
              </Box>
            </form>
          </Paper>
        </Box> 
    </React.Fragment>
  );
};


export default LoginPage;