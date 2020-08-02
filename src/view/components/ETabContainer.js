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

//entityName
//searchComponent
//updateComponent
export function ETabContainer(props) {
  // const classes = useStyles();
  const tabStyleClass = tabStyle();
  //component mode = VIEW,CREATE, UPDATE, SEARCH
  //   const [mode, setMode] = React.useState("SEARCH");

  const [tabValue, setTabValue] = React.useState(0);

  //vuEntityObj -> view-update entity object
  const [vuEntityObj, setVUEntityObj] = React.useState();

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };
  /*
  const [dataFromServer, setDataFromServer] = useState();
  // const [searchCriteriaArray, setSearchCriteriaArray] = useState([]);
*/

  const SearchComponent = props.searchComponent;
  const UpdateComponent = props.updateComponent;

  function navigateToDetail(refObject) {
    if (tabValue === 0) {
      setVUEntityObj(refObject);
      handleTabChange(null, 1);
    }
  }
  return (
    <>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label={`${props.entityName} tabs`}
      >
        <Tab classes={tabStyleClass} label="Search" id="simple_tab-0" />
        <Tab
          classes={tabStyleClass}
          label="New/Update/View"
          id="simple_tab-1"
        />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <SearchComponent navigateToDetail={navigateToDetail} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <UpdateComponent vuEntityObj={vuEntityObj} />
      </TabPanel>

      {/* {mode === "SEARCH" && (

      )} */}
    </>
  );
}
