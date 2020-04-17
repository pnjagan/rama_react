import React from 'react';
import { Button } from '@storybook/react/demo';
import {RRTextField,RRDateField,RRSelectField,RRCheckbox,RRButton,RRLink} from '../shared/MFComponentWraps';
import LoginPage from '../pages/LoginPage';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
// import TabPanel from '@material-ui/core/TabPanel';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import { createMuiTheme ,ThemeProvider} from '@material-ui/core/styles';

import {SingleColumnForm,DoubleColumnForm,SingleColumnOfMFF}  from '../shared/LayoutHelper';

export default { title: 'TAB DEMO' };

export const LoginPageDemo = () => <LoginPage/>;

const TabPanel = (props) => {
  return (props.index === props.value)? <div> {props.children}</div>:null;
}

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

export const TabDemo = () => {
  const classes = tabStyle();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div >

        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab classes={classes} label="Item One" id='simple_tab-0' />
          <Tab classes={classes} label="Item Two"  id='simple_tab-1' />
          <Tab classes={classes} label="Item Three"  id='simple_tab-2'/>
        </Tabs>

      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );

}
