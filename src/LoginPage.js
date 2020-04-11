
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {CssBaseline,Typography,Container,Paper,TextField,Button,Link,Box} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  mainCanvas: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',    
    alignItems: 'center',  
  },
  loginPaper: {
    //  width: '400px',
    //  height: '300px',

    },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',    
    alignItems: 'center', 

    },    
  defaultElement: {
      margin: '1vh'

    },      
  }
));  

function LoginPage() {

  const classes = useStyles();

  const preventDefault = event => event.preventDefault();

  return (
    <React.Fragment>
      <CssBaseline />

        <Box className={classes.mainCanvas}>
          <Paper className={classes.loginPaper}>
            <form noValidate autoComplete="off">
              <Box className={classes.loginForm}>

                <Typography variant="h5" className={classes.defaultElement} >
                  Welcome to SriRam Invoicing Application
                </Typography>            

                <TextField className={classes.defaultElement} id="LoginUser" label="User name" variant="outlined" />
                <TextField className={classes.defaultElement} id="Password" label="Password" variant="outlined" type="password"/>
                <Button className={classes.defaultElement} variant="contained">Login</Button>
                <Link className={classes.defaultElement} href="#" onClick={preventDefault}>
                  Forgot my Password
                </Link>
              </Box>
            </form>
          </Paper>
        </Box>
    </React.Fragment>
  );
};


export default LoginPage;