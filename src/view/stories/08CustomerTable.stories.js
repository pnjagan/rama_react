import React, { useState, useEffect, forwardRef } from "react";
import {
  Typography,
  Paper,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

import MaterialTable from "material-table";
import { log } from "../../state/utils";

import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import PageviewIcon from "@material-ui/icons/Pageview";

export default { title: "08 - CUstomer Table DEMO" };

function DtlsBtn() {
  return <Button>Dtls</Button>;
}

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export function CustomerSearchDemo() {
  const [state, setState] = React.useState({
    columns: [
      {
        title: "ID",
        field: "id",
        type: "numeric",
        width: "5%",
        editable: "never",
        cellStyle: {
          // width: "3rem",
          // maxWidth: "3rem",
          backgroundColor: "#dd0",
          // textAlign: "center",
        },
        headerStyle: {
          // width: "5%",
          backgroundColor: "#d0d",
          // maxWidth: "3rem",
        },
      },
      {
        title: "Name",
        field: "name",
        width: "20%",
        headerStyle: {
          // width: "25%",
          // maxWidth: "3rem",
        },
      },
      {
        title: "Number",
        field: "number",
        width: "10%",
        headerStyle: {
          // width: "15%",
          // maxWidth: "3rem",
        },
      },
      {
        title: "Email",
        field: "email",
        width: "10%",
        headerStyle: {
          // width: "15%",
          // maxWidth: "3rem",
        },
      },
      {
        title: "Address Line1",
        field: "address_line1",
        width: "55%",
        headerStyle: {
          // width: "40%",
          // maxWidth: "3rem",
        },
      },
      // { title: "Address Line2", field: "address_line2" },
      // { title: "Address Line3", field: "address_line3" },
    ],
    data: [
      {
        id: 1,
        name: "Hare Krishna 1",
        number: "HK01",
        email: "krishna1@chennai.com",
        address_line1: "NO 1, madhavan st, govindapuram",
        // address_line2: "Ram  Ram 1",
        // address_line3: "Krishna  Krishna 1",
      },
      {
        id: 2,
        name: "Hare Krishna 2",
        number: "HK02",
        email: "krishna2@chennai.com",
        address_line1: "NO 2, madhavan st, govindapuram",
        // address_line2: "Ram  Ram 2",
        // address_line3: "Krishna  Krishna 2",
      },
      {
        id: 3,
        name: "Hare Krishna 3",
        number: "HK03",
        email: "krishna3@chennai.com",
        address_line1: "NO 3, madhavan st, govindapuram",
        // address_line2: "Ram  Ram 3",
        // address_line3: "Krishna  Krishna 3",
      },
      {
        id: 4,
        name: "Hare Krishna 4",
        number: "HK04",
        email: "krishna4@chennai.com",
        address_line1: "NO 4, madhavan st, govindapuram",
        // address_line2: "Ram  Ram 4",
        // address_line3: "Krishna  Krishna 4",
      },
      {
        id: 5,
        name: "Hare Krishna 5",
        number: "HK05",
        email: "krishna5@chennai.com",
        address_line1: "NO 5, madhavan st, govindapuram",
        // address_line2: "Ram  Ram 4",
        // address_line3: "Krishna  Krishna 4",
      },
      {
        id: 6,
        name: "Hare Krishna 6",
        number: "HK06",
        email: "krishna6@chennai.com",
        address_line1: "NO 6, madhavan st, govindapuram",
        // address_line2: "Ram  Ram 4",
        // address_line3: "Krishna  Krishna 4",
      },
    ],
  });

  return (
    <Paper>
      <MaterialTable
        title="Customer results"
        columns={state.columns}
        data={state.data}
        icons={tableIcons}
        actions={[
          {
            icon: PageviewIcon,
            tooltip: "Detail View",
            onClick: (event, rowData) => alert("Details of " + rowData.name),
          },
        ]}
        // editable={{
        //   onRowAdd: (newData) =>
        //     new Promise((resolve) => {
        //       setTimeout(() => {
        //         resolve();
        //         setState((prevState) => {
        //           const data = [...prevState.data];
        //           data.push(newData);
        //           return { ...prevState, data };
        //         });
        //       }, 600);
        //     }),
        //   onRowUpdate: (newData, oldData) =>
        //     new Promise((resolve) => {
        //       setTimeout(() => {
        //         resolve();
        //         if (oldData) {
        //           setState((prevState) => {
        //             const data = [...prevState.data];
        //             data[data.indexOf(oldData)] = newData;
        //             return { ...prevState, data };
        //           });
        //         }
        //       }, 600);
        //     }),
        //   onRowDelete: (oldData) =>
        //     new Promise((resolve) => {
        //       setTimeout(() => {
        //         resolve();
        //         setState((prevState) => {
        //           const data = [...prevState.data];
        //           data.splice(data.indexOf(oldData), 1);
        //           return { ...prevState, data };
        //         });
        //       }, 600);
        //     }),
        // }}
      />
    </Paper>
  );
}
