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

import * as R from "ramda";

import { makeStyles } from "@material-ui/core/styles";

import { FFShowError } from "../shared/FFShowError";

import { FlowLayout } from "../shared/LayoutHelper";

import { Form, Field, FormSpy } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";

import { reduxPromiseListener as promiseListener } from "../../index";
import { FORM_ERROR } from "final-form";
import MakeAsyncFunction from "react-redux-promise-listener";
import { log, isBlank } from "../../state/utils";
import { openNotifier } from "./SIASnackBar";

import {
  customerGetRequested,
  customerGetResponded,
} from "../../state/ducks/customer";

// import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
import MaterialTable from "material-table";

//Starndar Icons
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

//Icon added for view/update
import PageviewIcon from "@material-ui/icons/Pageview";

import produce, { setAutoFreeze } from "immer";

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

const searchStyles = makeStyles((theme) => {
  return {
    searchCrit: {
      margin: theme.spacing(0.5),
    },
  };
});

export function CustomerSearch() {
  const searchStyleClass = searchStyles();

  const [state, setState] = React.useState({
    columns: [
      /*
      {
        title: "ID",
        field: "id",
        type: "numeric",
        width: "5%",
        editable: "never",
        // cellStyle: {
        //   // width: "3rem",
        //   // maxWidth: "3rem",
        //   backgroundColor: "#dd0",
        //   // textAlign: "center",
        // },
        // headerStyle: {
        //   // width: "5%",
        //   backgroundColor: "#d0d",
        //   // maxWidth: "3rem",
        // },
      }, 
      */
      {
        title: "Name",
        field: "customerName",
        width: "20%",
        headerStyle: {
          // width: "25%",
          // maxWidth: "3rem",
        },
      },
      {
        title: "Number",
        field: "customerNum",
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
        field: "addressLine1",
        width: "55%",
        headerStyle: {
          // width: "40%",
          // maxWidth: "3rem",
        },
      },
      // { title: "Address Line2", field: "address_line2" },
      // { title: "Address Line3", field: "address_line3" },
    ],
    data: [] /*[
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
    */,
  });

  // const [dataFromServer, setDataFromServer] = useState();

  const setDataFromServer = (data) => {
    log("Data in Data From Server:", data);
    setState((prevState) => {
      const dataForTable = produce(prevState, (draft) => {
        draft.data = data.customerList;
      });

      log("dataForTable :", dataForTable);
      return dataForTable;
    });
  };

  const [addSearchField, setAddSearchField] = useState("");
  const [listOfCriteria, setListOfCriteria] = useState([
    { key: "customer_number", value: "Customer Number" },
    { key: "customer_name", value: "Customer Name" },
  ]);

  return (
    <Paper>
      <MakeAsyncFunction
        listener={promiseListener}
        start={customerGetRequested.type}
        resolve={customerGetResponded.type}
        reject={""}
        setPayload={(action, payload) => {
          log("Set Payload called act:", action, " payload:", payload);
          // setMessageFromServer("Donation detail being sent to server");
          return {
            ...action,
            payload: {
              ...payload,
            },
          };
        }}
        getPayload={(action) => {
          log("Get Customer Query Payload :", action.payload);
          setAutoFreeze(false);
          setDataFromServer(action.payload.data);

          let errors = {};
          if (!isBlank(action.payload.requestError)) {
            errors[FORM_ERROR] = action.payload.requestError;
          }

          if (!isBlank(action.payload.detailError)) {
            errors = { ...errors, ...action.payload.detailError };
          }
          return errors;
        }}
      >
        {(asyncSubmitFn) => {
          const asyncSubmitFnWrap = function (...params) {
            // log("ASYNC fn called :", params);
            return asyncSubmitFn(...params);
          };

          return (
            <Form
              onSubmit={asyncSubmitFnWrap}
              initialValues={{ andCondition: true }}
              mutators={{
                // potentially other mutators could be merged here
                ...arrayMutators,
              }}
              decorators={[]}
              validate={(values) => {
                // log("values :", values);
                const errors = {};
                // if (isBlank(values.customerName)) {
                //   errors.customerName = "Customer name is required";
                // }

                // if (isBlank(values.customerNum)) {
                //   errors.customerNum = "Customer number is required";
                // }

                // if (isBlank(values.phone) && isBlank(values.email)) {
                //   errors[FORM_ERROR] =
                //     "Both email and phone number cannot be blank";
                // }

                return errors;
              }}
            >
              {(props) => {
                const {
                  submitError,
                  submitErrors,
                  handleSubmit,
                  form,
                  submitting,
                  pristine,
                  values,
                  error,
                  hasSubmitErrors,
                  touched,
                } = props;

                return (
                  <form onSubmit={handleSubmit}>
                    <FlowLayout column>
                      <Typography>Search customers</Typography>

                      <FieldArray name="searchCriteria">
                        {(props) => {
                          // log("props :", props);
                          let { fields } = props;

                          // log("Values :", fields.value);

                          return (
                            <div>
                              {fields.map((criteriaElement, index) => {
                                /*
                                log(
                                  "criteria :",
                                  index,
                                  " - ",
                                  fields.value[index].criteria.addSearchField
                                );
                                */

                                return (
                                  <div key={`Row#${index}`}>
                                    <Field name={`${criteriaElement}.value`}>
                                      {({ input, meta }) => (
                                        <>
                                          <TextField
                                            {...input}
                                            size="small"
                                            variant="outlined"
                                            label={
                                              R.filter(
                                                (e) =>
                                                  e.key ===
                                                  fields.value[index].criteria,
                                                listOfCriteria
                                              )[0].value
                                            }
                                            placeholder="use * as wildcard"
                                            className={
                                              searchStyleClass.searchCrit
                                            }
                                          />
                                          <Button
                                            onClick={() => fields.remove(index)}
                                          >
                                            [-]
                                          </Button>
                                          <FFShowError meta={meta} />
                                        </>
                                      )}
                                    </Field>
                                  </div>
                                );
                              })}

                              <FlowLayout row>
                                <Select
                                  id="search-criteria_to_add"
                                  value={addSearchField}
                                  onChange={(e) => {
                                    setAddSearchField(e.target.value);
                                  }}
                                >
                                  {listOfCriteria.map((critObject) => (
                                    <MenuItem
                                      key={`${critObject.key}`}
                                      value={`${critObject.key}`}
                                    >
                                      {critObject.value}
                                    </MenuItem>
                                  ))}

                                  {/* <MenuItem value={"customerName"}>
                                  Customer Name
                                </MenuItem> */}
                                </Select>
                                <Button
                                  onClick={() => {
                                    // log("fields.value :", fields.value);

                                    // log(" on click :", addSearchField);
                                    if (!isBlank(addSearchField)) {
                                      // fileld should not already exist

                                      // log("not null :", fields.value != null);

                                      // if (fields.value != null) {
                                      //   log(
                                      //     "FILTER :",
                                      //     R.filter(
                                      //       (e) =>
                                      //         e.criteria.addSearchField ===
                                      //         addSearchField,
                                      //       fields.value
                                      //     ).length
                                      //   );
                                      // }

                                      if (
                                        fields.value == null ||
                                        R.filter(
                                          (e) => e.criteria === addSearchField,
                                          fields.value
                                        ).length === 0
                                      ) {
                                        fields.push({
                                          criteria: addSearchField,
                                          value: "",
                                        });
                                      }
                                    }
                                  }}
                                >
                                  Add
                                </Button>
                              </FlowLayout>
                            </div>
                          );
                        }}
                      </FieldArray>

                      <FlowLayout row>
                        <span>AND condn</span>
                        <Field name="andCondition" type="checkbox">
                          {({ input, meta }) => (
                            <>
                              <Switch
                                // checked={state.checkedB}
                                {...input}
                                name="andCondition"
                                color="primary"
                              />

                              <FFShowError meta={meta} />
                            </>
                          )}
                        </Field>

                        <Button type="submit">Go</Button>
                      </FlowLayout>
                    </FlowLayout>
                  </form>
                );
              }}
            </Form>
          );
        }}
      </MakeAsyncFunction>

      <MaterialTable
        title="Customer results"
        columns={state.columns}
        data={state.data}
        icons={tableIcons}
        actions={[
          {
            icon: PageviewIcon,
            tooltip: "Detail view",
            onClick: (event, rowData) => alert("Detail view " + rowData.name),
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
