import React, { useState, useEffect } from "react";
import { Typography, Paper, TextField, Button } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { FFShowError } from "../shared/FFShowError";

import { FlowLayout } from "../shared/LayoutHelper";

import { RRDateField } from "../shared/MFComponentWraps";
import {
  MuiPickersUtilsProvider,
  // KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { format, compareAsc } from "date-fns";
import produce, { setAutoFreeze } from "immer";

import { DatePicker } from "@material-ui/pickers";

import { Form, Field, FormSpy } from "react-final-form";
import { reduxPromiseListener as promiseListener } from "../../index";
import { FORM_ERROR } from "final-form";
import MakeAsyncFunction from "react-redux-promise-listener";

import { log, isBlank } from "../../state/utils";
import { openNotifier } from "./SIASnackBar";

import {
  invoiceSaveRequested,
  invoiceSaveResponded,
} from "../../state/ducks/invoice";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

//This wrapper there to set form values
function InvoiceFormWr(props) {
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

const useInvStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

export function InvoiceCrUpd(props) {
  const [dataFromServer, setDataFromServer] = useState();

  log("CrUpd props :", props);
  const classes = useInvStyles();

  //START and RESOLVE to be changed
  return (
    <MakeAsyncFunction
      listener={promiseListener}
      start={invoiceSaveRequested.type}
      resolve={invoiceSaveResponded.type}
      reject={""}
      setPayload={(action, payload) => {
        log("Set Payload called act:", action, " payload:", payload);
        // setMessageFromServer("Donation detail being sent to server");

        // log(
        //   "Formatted Payload Obj :",
        //   produce(payload, (draft) => {
        //     draft.invDate = format(draft.invDate, "yyyy-MM-dd");
        //     draft.invIssueDate = format(draft.invIssueDate, "yyyy-MM-dd");
        //     return draft;
        //   })
        // );

        return {
          ...action,
          payload: produce(payload, (draft) => {
            draft.invDate = format(draft.invDate, "yyyy-MM-dd");
            draft.invIssueDate = format(draft.invIssueDate, "yyyy-MM-dd");

            return draft;
          }),
        };
      }}
      getPayload={(action) => {
        log("Get Invoice ACTION :", action);

        if (action.payload.data != null) {
          openNotifier("success", "Invoice is saved!");
        }
        setDataFromServer(action.payload.data);

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
        return (
          <Form
            onSubmit={asyncSubmitFn}
            initialValues={{
              invDate: new Date(),
              invIssueDate: new Date(),
              ...props.vuEntityObj,
            }}
            mutators={{}}
            decorators={[]}
            validate={(values) => {
              /* validation FUNCTION for INVOICE */
              return {};
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
              const formUpdateFn = (form, values, data) => {
                log("calling form Init", values, data);
                //DO NOTHING FOR INV

                // if (values != null && data != null) {
                //   if (values.customerId !== data.customerId)
                //     form.change("customerId", data.customerId);
                // }
              };

              return (
                <InvoiceFormWr
                  {...{
                    form,
                    values,
                    dataFromServer,
                    formInitFn: formUpdateFn,
                  }}
                >
                  <form onSubmit={handleSubmit}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Paper>
                        <FlowLayout column>
                          <Typography>Invoice</Typography>
                          {
                            <FFShowError
                              error={error}
                              submitError={submitError}
                            />
                          }
                          <Field name="id">
                            {({ input, meta }) => (
                              <Typography>Invoice Id: {input.value}</Typography>
                            )}
                          </Field>

                          <Field name="invNum">
                            {({ input, meta }) => (
                              <>
                                <TextField
                                  {...input}
                                  size="small"
                                  label="Invoice Number"
                                  variant="outlined"
                                  placeholder="100"
                                />
                                <FFShowError meta={meta} />
                              </>
                            )}
                          </Field>

                          <Field name="invDate">
                            {({ input, meta }) => (
                              <>
                                <DatePicker
                                  label="Invoice Date"
                                  {...input}
                                  animateYearScrolling
                                  format="dd-MM-yyyy"
                                />

                                <FFShowError meta={meta} />
                              </>
                            )}
                          </Field>

                          <Field name="invIssueDate">
                            {({ input, meta }) => (
                              <>
                                <DatePicker
                                  label="Invoice issued Date"
                                  {...input}
                                  animateYearScrolling
                                  format="dd-MM-yyyy"
                                />

                                <FFShowError meta={meta} />
                              </>
                            )}
                          </Field>

                          <Field name="shiptoCustNum">
                            {({ input, meta }) => (
                              <>
                                {/* <TextField
                                  {...input}
                                  size="small"
                                  label="Ship To Cust#"
                                  variant="outlined"
                                  placeholder="100"
                                /> */}

                                <FormControl
                                  variant="outlined"
                                  className={classes.formControl}
                                >
                                  <InputLabel id="shiptoCustNum">
                                    Ship To Cust#
                                  </InputLabel>
                                  <Select
                                    labelId="shiptoCustNum"
                                    id="shiptoCustNum"
                                    {...input}
                                    label="Ship To Cust#"
                                  >
                                    {/* <MenuItem value="">
                                      <em>None</em>
                                    </MenuItem> 
                                    */}
                                    <MenuItem value={10}>
                                      RAM100000000000
                                    </MenuItem>
                                    <MenuItem value={20}>RAM20</MenuItem>
                                    <MenuItem value={30}>RAM30</MenuItem>
                                  </Select>
                                </FormControl>

                                <FFShowError meta={meta} />
                              </>
                            )}
                          </Field>

                          <FlowLayout>
                            <Button type="submit">Save</Button>

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
                    </MuiPickersUtilsProvider>
                  </form>
                </InvoiceFormWr>
              );
            }}
          </Form>
        );
      }}
    </MakeAsyncFunction>
  );
}
