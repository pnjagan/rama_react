
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {CssBaseline,Typography,Container,Paper,TextField,Button,Link,Box} from '@material-ui/core';
import {SingleColumnOfMFF,SingleRowOfMFF}  from '../shared/LayoutHelper';
import {
  RRTextField
  ,RRDateField
  ,RRSelectField
  ,RRCheckbox
  ,RRButton
  ,RRLink
  ,RRTextFieldBuilder
  ,RRButtonBuilder
} from '../shared/MFComponentWraps';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useDispatch ,useSelector} from 'react-redux';
import {mLoginPost} from '../../state/actions';
import {log} from '../../state/utils';

import { useHistory } from "react-router-dom";
import {PathFunctionMap as CU} from '../shared/ConstantsUtils';


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

  let history = useHistory();

  //Find when state has changed
  const loginState = useSelector(
    state => state.loginKey
  );

  useEffect(()=>{
    if(loginState.meta.status==='READY') {
      history.push(CU.HOME.path);
    }
  });


  const TabPanel = (props) => {
    return (props.index === props.value)? <div> {props.children}</div>:null;
  }  

  const tabStyleClass = tabStyle();
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };


  const classes = useStyles();

  const preventDefault = event => event.preventDefault();

  let title=<Typography variant="h5" className={classes.defaultElement} >
  SriRam Invoice
  </Typography>;




  let userNameTFB = new RRTextFieldBuilder({
    size : 'medium',
    label : 'Username',
    placeholder : 'name@domain.com',
    inputLen : '20rem'    
  });

  let passwordTFB = new RRTextFieldBuilder({
    size : 'medium',
    label : 'Password',
    inputLen : '20rem',
    type: 'password' 
  });


  // let userNameTF = RRTextField ({
  //   size : 'medium',
  //   label : 'Username',
  //   placeholder : 'name@domain.com',
  //   inputLen : '20rem'    
  // }); 
  
  // let passwordTF = RRTextField ({
  //   size : 'medium',
  //   label : 'Password',
  //   // placeholder : 'name@domain.com',
  //   inputLen : '20rem',
  //   type: 'password'
  // }); 

  

  let loginButtonB = new RRButtonBuilder({
    caption : 'Login',
    clickHandler : 
      () => {
        log('ON click handler button');
        log('username:',userNameTFB.textValue);
        log('password:',passwordTFB.textValue);

        dispatch(mLoginPost({
          userLogin: userNameTFB.textValue,
          password: passwordTFB.textValue
        }));
      }
  });

  let forgotLink =RRLink({text: 'Forgot password'});

  let newUserLink = RRLink({text:'New user'});

  let srf  = SingleRowOfMFF([loginButtonB.getComponent(),forgotLink])
  let scf = SingleColumnOfMFF([title
                              ,userNameTFB.getComponent()
                              ,passwordTFB.getComponent()
                              ,srf
                              ]
                            ); //,newUserLink

  return (
    <React.Fragment>
      <CssBaseline />
      {/* {scf} */}
          <Box className={classes.mainCanvas}>
          <Paper className={classes.loginPaper}>
            <form noValidate autoComplete="off">
              <Box className={classes.loginForm}>
                    {  
                      loginState.meta.status==='FETCH_FAILED'? loginState.meta.message : ''
                    }
                  <Tabs value={tabValue} onChange={handleTabChange} aria-label="simple tabs example">
                    <Tab classes={tabStyleClass} label="Sign-in" id='simple_tab-0' />
                    <Tab classes={tabStyleClass} label="Register"  id='simple_tab-1' />
                  </Tabs>

                  <TabPanel value={tabValue} index={0}>
                    {scf}  
                  </TabPanel>
                  <TabPanel value={tabValue} index={1}>
                    Register
                  </TabPanel>

                  {/* <a href="#" onClick={(e)=>{log('LINK CLicked',CU.HOME); e.preventDefault(); history.push(CU.HOME.path)}}>GOTO HOME</a> */}

                        
              </Box>
            </form>
          </Paper>
        </Box> 
    </React.Fragment>
  );
};


export default LoginPage;