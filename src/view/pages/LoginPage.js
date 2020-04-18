
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {CssBaseline,Typography,Container,Paper,TextField,Button,Link,Box} from '@material-ui/core';
import {SingleColumnOfMFF,SingleRowOfMFF}  from '../shared/LayoutHelper';
import {RRTextField,RRDateField,RRSelectField,RRCheckbox,RRButton,RRLink} from '../shared/MFComponentWraps';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useDispatch } from 'react-redux'

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
  }
));  

const tabStyle = makeStyles(theme=>{return {
  root: {
      padding : theme.spacing(.5),
      backgroundColor : theme.palette.grey[100],
      borderStyle:'solid',
      borderColor: 'purple',
      borderWidth: '0.05rem',
      borderRadius :'.3rem',
      margin: '.2rem'
  },
  selected: {
    padding : theme.spacing(.5),
    backgroundColor : theme.palette.grey[200],
    borderStyle:'solid',
    borderColor: 'purple',
    borderWidth: '0.05rem',
    borderRadius :'.3rem',
    margin: '.2rem'

  }
  }
});


function LoginPage() {

  let dispatch = useDispatch();

  const TabPanel = (props) => {
    return (props.index === props.value)? <div> {props.children}</div>:null;
  }  

  const tabStyleClass = tabStyle();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const classes = useStyles();

  const preventDefault = event => event.preventDefault();

let title=<Typography variant="h5" className={classes.defaultElement} >
SriRam Invoice
</Typography>;

  let userNameTF = RRTextField ({
    size : 'medium',
    label : 'Username',
    placeholder : 'name@domain.com',
    inputLen : '20rem'    
  }); 
  
  let passwordTF = RRTextField ({
    size : 'medium',
    label : 'Password',
    // placeholder : 'name@domain.com',
    inputLen : '20rem',
    type: 'password'
  }); 

  

  let loginButton = RRButton({
    caption : 'Login',
    onClick : 
      () => {
        dispatch({});
      }
    
  });

  let forgotLink =RRLink({text: 'Forgot password'});

  let newUserLink = RRLink({text:'New user'});

  let srf  = SingleRowOfMFF([loginButton,forgotLink])
  let scf = SingleColumnOfMFF([title,userNameTF,passwordTF,srf]); //,newUserLink






  return (
    <React.Fragment>
      <CssBaseline />
      {/* {scf} */}
          <Box className={classes.mainCanvas}>
          <Paper className={classes.loginPaper}>
            <form noValidate autoComplete="off">
              <Box className={classes.loginForm}>

                  <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab classes={tabStyleClass} label="Sign-in" id='simple_tab-0' />
                    <Tab classes={tabStyleClass} label="Register"  id='simple_tab-1' />
                  </Tabs>

                  <TabPanel value={value} index={0}>
                    {scf}  
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    Register
                  </TabPanel>

                        
              </Box>
            </form>
          </Paper>
        </Box> 
    </React.Fragment>
  );
};


export default LoginPage;