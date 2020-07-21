import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { CustomerCrUpd } from "./CustomerCrUpd";
import { CustomerSearch } from "./CustomerSearch";

// const useStyles = makeStyles((theme) => ({
//   sample: {},
// }));

const tabStyle = makeStyles((theme) => {
  return {
    root: {
      padding: theme.spacing(0.5),
      backgroundColor: theme.palette.grey[100],
      borderStyle: "solid",
      borderColor: "purple",
      borderWidth: "0.05rem",
      borderRadius: ".3rem",
      margin: ".2rem",
    },
    selected: {
      padding: theme.spacing(0.5),
      backgroundColor: theme.palette.grey[200],
      borderStyle: "solid",
      borderColor: "purple",
      borderWidth: "0.05rem",
      borderRadius: ".3rem",
      margin: ".2rem",
    },
  };
});

const TabPanel = (props) => {
  return props.index === props.value ? <div> {props.children}</div> : null;
};

export function Customer(props) {
  // const classes = useStyles();
  const tabStyleClass = tabStyle();
  //component mode = VIEW,CREATE, UPDATE, SEARCH
  const [mode, setMode] = React.useState("SEARCH");

  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };
  /*
  const [dataFromServer, setDataFromServer] = useState();
  // const [searchCriteriaArray, setSearchCriteriaArray] = useState([]);
*/

  return (
    <>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="customer tabs"
      >
        <Tab classes={tabStyleClass} label="Search" id="simple_tab-0" />
        <Tab classes={tabStyleClass} label="New" id="simple_tab-1" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <CustomerSearch />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <CustomerCrUpd />
      </TabPanel>

      {/* {mode === "SEARCH" && (

      )} */}
    </>
  );
}
