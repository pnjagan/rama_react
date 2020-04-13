
// Taken from https://github.com/mui-org/material-ui/issues/11723
// Written by Olivier Tassinari oliviertassinari
import React from "react";

import MuiMenu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import OTSubMenuItem from "./OTSubMenuItem";


/*
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
*/

export default class OTMenu extends React.Component {

  renderMenuItems = () => {
    const { menuItems } = this.props;
    return menuItems.map(menuItem => {
      if (menuItem.hasOwnProperty("subMenuItems")) {
        return (
          <OTSubMenuItem
            key={menuItem.key}
            caption={menuItem.caption}
            menuItems={menuItem.subMenuItems}
          />
        );
      } else {
        return <MenuItem key={menuItem.key} onClick={menuItem.onClick}>
          {menuItem.caption}
        </MenuItem>;
      }

    });
  };

  constructor(props){
    super(props);

  }


  render() {
 
    const { anchorElement, open, onClose } = this.props;
    return (
      <MuiMenu  anchorOrigin={
                    {
                      horizontal: 'right'
                       ,vertical: 'top' 
                    }        
                } 
                anchorEl={anchorElement} 
                open={open} 
                onClose={onClose}
      >
        {this.renderMenuItems()}
      </MuiMenu>
    );
  }

}





/* Example of menuItems:
[
    {
        'key': 'item1',
        'caption': 'Item 1',
        'onClick': (event) => function () {
        }
    },
    {
        'key': 'item2',
        'caption': 'Item 2',
        'onClick': (event) => function () {
        }
    },
    {
        'key': 'item3',
        'caption': 'Item 3',
        'subMenuItems': [
            {
                'key': 'item1',
                'caption': 'Item 1',
                'onClick': (event) => function () {
                }
            },
            {
                'key': 'item2',
                'caption': 'Item 2',
                'onClick': (event) => function () {
                }
            }
        ]
    }
];
 */
