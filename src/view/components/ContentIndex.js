
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

import {
          CssBaseline
          ,Typography
          ,Container
          ,Paper
          ,TextField
          ,Button
          ,Link
          ,Box
          //////////////
          ,AppBar
          ,Toolbar
          ,Hidden
          ,IconButton
      } from '@material-ui/core';

 

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';

import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';      

import MenuIcon from '@material-ui/icons/Menu';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import {PathFunctionMap as CU} from '../shared/ConstantsUtils';


const useStyles = makeStyles(theme => ({
    title : {

    }, 
    mainCanvas : {
      margin: theme.spacing(2) 
    },
    submenuLink : {
      display: "block" ,
      margin : theme.spacing(.5) 
    },
    cardHeading : {
      margin : theme.spacing(.5) 
    }
  }
));



function ContentIndex(props) {

  const classes = useStyles();
  let history = useHistory();

  const preventDefault = event => event.preventDefault();

  const goTo = (e,l) => {e.preventDefault(); history.push(l);}

  	return (
    <Box className={classes.mainCanvas}>

        <Grid container spacing={3} style={{}}>

          {/* -----------------------------INVOICE ------------------------------------- */}
          <Grid item xs={12} sm={6} md={3} lg={2}>
               <Paper elevation={2}>
                  <Typography variant="h6" className={classes.cardHeading} >
                    Invoice
                  </Typography>


                  <Link href="#" onClick={ (e) => { goTo(e,CU.INV_CREATE.path); } } className={classes.submenuLink}>
                    New invoice
                  </Link>

                  <Link href="#" onClick={ (e) => { goTo(e,CU.INV_SEARCH.path); } } className={classes.submenuLink}>
                    Search invoices
                  </Link>                  
               </Paper>
          </Grid>

          {/* -----------------------------ITEMS ------------------------------------- */}
          <Grid item xs={12} sm={6} md={3} lg={2}>
               <Paper elevation={2}>
                  <Typography variant="h6" className={classes.cardHeading} >
                    Items
                  </Typography>


                  <Link href="#" onClick={preventDefault} className={classes.submenuLink}>
                    New items
                  </Link>

                  <Link href="#" onClick={preventDefault} className={classes.submenuLink}>
                    Search items
                  </Link>

                  <Link href="#" onClick={preventDefault} className={classes.submenuLink}>
                    Item pricing
                  </Link>

                  <Link href="#" onClick={preventDefault} className={classes.submenuLink}>
                    Item categories
                  </Link>  
               </Paper>
          </Grid>

          {/* -----------------------------CUSTOMERS ------------------------------------- */}          
          <Grid item xs={12} sm={6} md={3} lg={2}>
               <Paper elevation={2}>

                  <Typography variant="h6" className={classes.cardHeading} >
                    Customers
                  </Typography>               

                  <Link href="#" onClick={preventDefault} className={classes.submenuLink}>
                    New customers
                  </Link>

                  <Link href="#" onClick={preventDefault} className={classes.submenuLink}>
                    Search customers
                  </Link>

               </Paper>
          </Grid>

          {/* -----------------------------Configurations ------------------------------------- */}          
          <Grid item xs={12} sm={6} md={3} lg={2}>
               <Paper elevation={2}>

                  <Typography variant="h6" className={classes.cardHeading} >
                    Configurations
                  </Typography>               

                  <Link href="#" onClick={preventDefault} className={classes.submenuLink}>
                    Parameters
                  </Link>

                  <Link href="#" onClick={preventDefault} className={classes.submenuLink}>
                    User management
                  </Link>

                  <Link href="#" onClick={preventDefault} className={classes.submenuLink}>
                    Tax management
                  </Link>

                  <Link href="#" onClick={preventDefault} className={classes.submenuLink}>
                    Shipping methods
                  </Link>

               </Paper>
          </Grid>          






        </Grid>

      </Box>
  );
};


export default ContentIndex;      