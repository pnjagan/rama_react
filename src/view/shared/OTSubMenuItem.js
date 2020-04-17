// Taken from https://github.com/mui-org/material-ui/issues/11723
// Written by Olivier Tassinari oliviertassinari

import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import OTMenu from "./OTMenu";

import ArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

const styles = {
  subMenuItem: {
    display: "flex",
    justifyContent: "space-between"
  }
};


class OTSubMenuItem extends React.Component {
  // @observable menuOpen = false;
  // @observable anchorElement = null;

  constructor(props){
    super(props);
    this.state = {menuOpen: false};
  }




  setAnchorElement = node => {

    this.setState(
    {
      anchorElement : node
    });
    // this.anchorElement = node;
  };


  handleItemClick = (event) => {
    if (!this.state.anchorElement) {
      this.setAnchorElement(event.currentTarget);
    }

    this.setState(
      (state,props) => ({menuOpen : !state.menuOpen})
    );

  }


  handleSubMenuClose = () => {

    this.setState(
         {
            menuOpen : false
            ,anchorElement : null
         }
    );


  }

  render() {




    const { caption, menuItems, classes } = this.props;
    return (
      <React.Fragment>
        <MenuItem
          onClick={this.handleItemClick}
          className={classNames(classes.subMenuItem)}
        >
          {caption}
          <ArrowRightIcon />
        </MenuItem>
        <OTMenu
          open={this.state.menuOpen}
          menuItems={menuItems}
          anchorElement={this.state.anchorElement}
          onClose={this.handleSubMenuClose}
        />
      </React.Fragment>
    );
  }
}



export default withStyles(styles)(OTSubMenuItem);
