import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Link,
  Box,
  //////////////
  AppBar,
  Toolbar,
  Hidden,
  IconButton,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { FFShowError } from "../shared/FFShowError";

import {
  SingleColumnOfMFF,
  SingleRowOfMFF,
  FlowLayout,
  getDevice,
} from "../shared/LayoutHelper";

import { Form, Field, FormSpy } from "react-final-form";
import { reduxPromiseListener as promiseListener } from "../../index";
import { FORM_ERROR } from "final-form";

import MakeAsyncFunction from "react-redux-promise-listener";
import { log, isBlank } from "../../state/utils";
import { openNotifier } from "./SIASnackBar";

import {
  customerGetRequested,
  customerGetResponded,
  customerSaveRequested,
  customerSaveResponded,
} from "../../state/ducks/customer";

const useStyles = makeStyles((theme) => ({
  sample: {},
}));

function CustomFormWr(props) {
  const {
    form,
    values,
    dataFromServer, //NON standard input
    formInitFn, //What we need to do with the form
    children,
  } = props;
  useEffect(() => {
    formInitFn(form, values, dataFromServer);
  });
  return <>{children}</>;
}

export function Customer(props) {
  const classes = useStyles();
  //component mode = VIEW,CREATE, UPDATE, SEARCH
  const [mode, setMode] = React.useState("SEARCH");
  let formRef = null;
  function setFormRef(e) {
    formRef = e;
  }

  const [dataFromServer, setDataFromServer] = useState();

  return (
    <>
      {mode === "SEARCH" && (
        <Paper>
          <Typography>Search customers by name</Typography>

          <TextField
            size="medium"
            label="Customer name"
            variant="outlined"
            placeholder="ABC"
          />

          <Button>Go</Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setMode("NEW");
            }}
          >
            NEW
          </Button>
        </Paper>
      )}
      {mode === "NEW" && (
        <MakeAsyncFunction
          listener={promiseListener}
          start={customerSaveRequested.type}
          resolve={customerSaveResponded.type}
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
            log("Get Payload new DOC status :", action.payload);
            if (action.payload.sdata != null) {
              openNotifier("success", "Customer is saved!");
            }
            setDataFromServer(action.payload.sdata);

            // //setNewDonStatus(action.payload.data.new_donationStatus);
            // if (action.payload.data.new_donationStatus === "SAVED") {
            //   // setMessageFromServer("Successfully saved !!!");
            // } else if (action.payload.data.new_donationStatus === "FAILED") {
            //   // setMessageFromServer("SAVE of donation failed");
            // } else {
            //   // setMessageFromServer("");
            // }
            // delete action.payload.data;
            // log("Get Payload after TRIM action:", action);

            return action.payload;
          }}
        >
          {(asyncSubmitFn) => {
            return (
              <Form
                onSubmit={asyncSubmitFn}
                initialValues={{}}
                mutators={{}}
                decorators={[]}
                validate={(values) => {
                  // log("values :", values);
                  const errors = {};
                  if (isBlank(values.customerName)) {
                    errors.customerName = "Customer name is required";
                  }

                  if (isBlank(values.customerNum)) {
                    errors.customerNum = "Customer number is required";
                  }

                  if (isBlank(values.phone) && isBlank(values.email)) {
                    errors[FORM_ERROR] =
                      "Both email and phone number cannot be blank";
                  }

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

                  // log(" props", props);
                  const setCustomerId = (form, values, sdata) => {
                    log("calling form Init", values, sdata);
                    if (values != null && sdata != null) {
                      if (values.customerId !== sdata.customerId)
                        form.change("customerId", sdata.customerId);
                    }
                  };

                  return (
                    <CustomFormWr
                      {...{
                        form,
                        values,
                        dataFromServer,
                        formInitFn: setCustomerId,
                      }}
                    >
                      <form onSubmit={handleSubmit} ref={setFormRef}>
                        <Paper>
                          <FlowLayout column>
                            <Typography>Customer</Typography>
                            {touched["phone"] && touched["email"] && (
                              <FFShowError
                                error={error}
                                submitError={submitError}
                              />
                            )}
                            <Field name="customerId">
                              {({ input, meta }) => (
                                <Typography>
                                  Customer Id: {input.value}
                                </Typography>
                              )}
                            </Field>

                            <Field name="customerName">
                              {({ input, meta }) => (
                                <>
                                  <TextField
                                    {...input}
                                    size="small"
                                    label="Customer name"
                                    variant="outlined"
                                    placeholder="ABC"
                                  />
                                  <FFShowError meta={meta} />
                                </>
                              )}
                            </Field>
                            <Field name="customerNum">
                              {({ input, meta }) => (
                                <>
                                  <TextField
                                    {...input}
                                    size="small"
                                    label="Customer Number"
                                    variant="outlined"
                                    placeholder="100"
                                  />
                                  <FFShowError meta={meta} />
                                </>
                              )}
                            </Field>
                            <Field name="phone">
                              {({ input, meta }) => (
                                <>
                                  <TextField
                                    {...input}
                                    size="small"
                                    label="Phone"
                                    variant="outlined"
                                    placeholder="+919999999999"
                                  />

                                  <FFShowError meta={meta} />
                                </>
                              )}
                            </Field>
                            <Field name="email">
                              {({ input, meta }) => (
                                <>
                                  <TextField
                                    {...input}
                                    size="small"
                                    label="Email"
                                    variant="outlined"
                                    placeholder="email@domain.com"
                                  />

                                  <FFShowError meta={meta} />
                                </>
                              )}
                            </Field>
                            <Field name="address_line1">
                              {({ input, meta }) => (
                                <>
                                  <TextField
                                    {...input}
                                    size="small"
                                    label="Address Line 1"
                                    variant="outlined"
                                    placeholder="NO 11, aramudan street"
                                  />

                                  <FFShowError meta={meta} />
                                </>
                              )}
                            </Field>
                            <Field name="address_line2">
                              {({ input, meta }) => (
                                <>
                                  <TextField
                                    {...input}
                                    size="small"
                                    label="Address Line 2"
                                    variant="outlined"
                                    placeholder="narayanapuram extn"
                                  />

                                  <FFShowError meta={meta} />
                                </>
                              )}
                            </Field>
                            <Field name="address_line3">
                              {({ input, meta }) => (
                                <>
                                  <TextField
                                    {...input}
                                    size="small"
                                    label="Address Line 3"
                                    variant="outlined"
                                    placeholder="saketpur"
                                  />

                                  <FFShowError meta={meta} />
                                </>
                              )}
                            </Field>
                            <FlowLayout>
                              <Button
                                onClick={(e) => {
                                  e.preventDefault();
                                  //formRef.submit();
                                  formRef.dispatchEvent(
                                    new Event("submit", { cancelable: true })
                                  );
                                }}
                              >
                                Save with Ref
                              </Button>

                              <Button type="submit">Save with Type</Button>

                              <Button
                                onClick={(e) => {
                                  e.preventDefault();
                                  form.reset();
                                  form
                                    .getRegisteredFields()
                                    .forEach((fn) => form.resetFieldState(fn));
                                }}
                                disabled={submitting}
                              >
                                Clear
                              </Button>
                            </FlowLayout>
                          </FlowLayout>
                        </Paper>
                      </form>
                    </CustomFormWr>
                  );
                }}
              </Form>
            );
          }}
        </MakeAsyncFunction>
      )}
    </>
  );
}
