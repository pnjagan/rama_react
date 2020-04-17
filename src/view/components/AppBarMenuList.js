
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
import PersonIcon from '@material-ui/icons/Person';



const useStyles = makeStyles(theme => ({
    labelMenu : {
      textTransform: 'none',
      margin: '1rem',
      fontSize : '1.2rem'

    }    
  }
));  

export default function AppBarMenuList(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (


      <div>

      {/* <Button
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            color="inherit"
            variant= { props.outline === "no"? "text":"outlined" }
            className={classes.button}
          >
            <Typography variant="h6" >
              {props.menuName}
            </Typography>
          </Button> 
      */}


{
(!props.link) ? (<Link 
  ref={anchorRef}
  onClick={handleToggle}
  aria-haspopup="true"
  aria-controls={open ? 'menu-list-grow' : undefined}
  color="inherit"
  className={classes.labelMenu}
>
    {/* <Typography variant="h6" > */}
    
      {
      (
        mn => {
          if(mn !== 'LoggedInUser') {
            return mn;
          } else {
            return <PersonIcon />;
          }
      }
     )(props.menuName)
    }

</Link>) : (
    <Link 
      color="inherit"
      className={classes.labelMenu}
    >
    {props.menuName }
  </Link>
) 
}
          



        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                          <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                            { props.menuItems.map( (item , i)=> <MenuItem onClick={item.itemHandler} key={i}> {item.itemName} </MenuItem>)  }
                          </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

  );
}