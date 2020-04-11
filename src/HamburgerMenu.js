import React from "react";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';

import OTMenu from "./OTMenu";
import OTSubMenuItem from "./OTSubMenuItem";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const menuItems = [
  {
    key: "1",
    caption: "Invoice",
    onClick: () => {},
    subMenuItems: [
      {
        key: "100",
        caption: "New Invoice",
        onClick: () => {}
      },
      {
        key: "101",
        caption: "Search Invoices",
        onClick: () => {}
      }
    ]     
  },
  {
    key: "2",
    caption: "Items",
    onClick: () => {},
    subMenuItems: [
      {
        key: "100",
        caption: "New items",
        onClick: () => {}
      },
      {
        key: "101",
        caption: "Search items",
        onClick: () => {}
      },
      {
        key: "102",
        caption: "Item pricing",
        onClick: () => {}
      },
      {
        key: "103",
        caption: "Item categories",
        onClick: () => {}
      }
    ]     
  },
  {
    key: "3",
    caption: "Customers",
    onClick: () => {},
    subMenuItems: [
      {
        key: "100",
        caption: "New customers",
        onClick: () => {}
      },
      {
        key: "101",
        caption: "Search customers",
        onClick: () => {}
      }
    ]   
  },
  {
    key: "4",
    caption: "Configurations",
    onClick: () => {},
    subMenuItems: [
      {
        key: "100",
        caption: "Parameters",
        onClick: () => {}
      },
      {
        key: "101",
        caption: "User management",
        onClick: () => {}
      },
      {
        key: "102",
        caption: "Tax management",
        onClick: () => {}
      },
      {
        key: "103",
        caption: "Shipping methods",
        onClick: () => {}
      }
    ]    
  }
];


export default class HamburgerMenu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      anchorElement : null
    }

  }


  handleButtonClick = event => {
    this.setState( {anchorElement : event.currentTarget});
  };


  handleMenuClose = () => {
    this.setState( {anchorElement : null});    
  };

  render() {
    return (
      <React.Fragment>
        <IconButton onClick={this.handleButtonClick}>
          <MenuIcon />
        </IconButton>
    
        <OTMenu
          open={Boolean(this.state.anchorElement)}
          menuItems={menuItems}
          anchorElement={this.state.anchorElement}
          onClose={this.handleMenuClose}
        />



      </React.Fragment>
    );
  }
}
