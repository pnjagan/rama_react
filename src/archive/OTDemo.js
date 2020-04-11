import React from "react";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

import OTMenu from "./OTMenu";
import OTSubMenuItem from "./OTSubMenuItem";

const menuItems = [
  {
    key: "1",
    caption: "Button 1",
    onClick: () => {}
  },
  {
    key: "2",
    caption: "Button 2",
    onClick: () => {}
  },
  {
    key: "3",
    caption: "Button 3",
    onClick: () => {}
  },
  {
    key: "more",
    caption: "More items",
    subMenuItems: [
      {
        key: "4",
        caption: "Button 4",
        onClick: () => {}
      },
      {
        key: "5",
        caption: "Button 5",
        onClick: () => {}
      },
      {
        key: "6",
        caption: "Button 6",
        onClick: () => {}
      }
    ]
  }
];


export default class OTDemo extends React.Component {

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
          <AddIcon />
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
