import React, { useState, useEffect } from "react";
import { Typography, Paper, TextField, Button } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { FFShowError } from "../shared/FFShowError";

import { FlowLayout } from "../shared/LayoutHelper";

import { Form, Field, FormSpy } from "react-final-form";
import { reduxPromiseListener as promiseListener } from "../../index";
import { FORM_ERROR } from "final-form";
import MakeAsyncFunction from "react-redux-promise-listener";

import { log, isBlank } from "../../state/utils";
import { openNotifier } from "./SIASnackBar";

import {
  customerSaveRequested,
  customerSaveResponded,
} from "../../state/ducks/customer";

//This wrapper there to set form values
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

/*
startAction
resolveAction
entityName
formValidate

// a function used to update the form based on response from the server
formUpdate


Fields to Populate:
{fieldName, description, inputType}

inputType : text , textInput ,  dropDown , dropDownList

*/

export function ReusableCustomer(props) {
  let newProps = { ...props };
  newProps.startAction = customerSaveRequested;
  newProps.resolveAction = customerSaveResponded;
  newProps.entityName = "Customer";

  newProps.formUpdate = (form, values, data) => {
    log("calling form Init", values, data);
    if (values != null && data != null) {
      if (values.id !== data.id) form.change("id", data.id);
    }
  };

  newProps.formValidate = (values) => {
    // log("values :", values);
    const errors = {};
    if (isBlank(values.customerName)) {
      errors.customerName = "Customer name is required";
    }

    if (isBlank(values.customerNum)) {
      errors.customerNum = "Customer number is required";
    }

    if (isBlank(values.phone) && isBlank(values.email)) {
      errors[FORM_ERROR] = "Both email and phone number cannot be blank";
    }
    return errors;
  };

  newProps.fields = [];

  newProps.fields.push({
    fieldName: "id",
    description: "Customer Id",
    inputType: "text",
  });
  newProps.fields.push({
    fieldName: "customerName",
    description: "Customer Name",
    inputType: "textInput",
    placeHolder: "...",
  });
  newProps.fields.push({
    fieldName: "customerNum",
    description: "Customer Number",
    inputType: "textInput",
    placeHolder: "0000",
  });

  newProps.fields.push({
    fieldName: "phone",
    description: "Phone",
    inputType: "textInput",
    placeHolder: "0000",
  });

  newProps.fields.push({
    fieldName: "email",
    description: "Email",
    inputType: "textInput",
    placeHolder: "a@a.com",
  });

  newProps.fields.push({
    fieldName: "addressLine1",
    description: "Address Line 1",
    inputType: "textInput",
    placeHolder: "...",
  });

  newProps.fields.push({
    fieldName: "addressLine2",
    description: "Address Line 2",
    inputType: "textInput",
    placeHolder: "...",
  });

  newProps.fields.push({
    fieldName: "addressLine3",
    description: "Address Line 3",
    inputType: "textInput",
    placeHolder: "...",
  });

  //props.vuEntityObj

  return <EntityCrUpd {...props} {...newProps} />;
}

export function EntityCrUpd(props) {
  const [dataFromServer, setDataFromServer] = useState();
  // const [searchCriteriaArray, setSearchCriteriaArray] = useState([]);

  log("CrUpd props :", props);

  const {
    startAction,
    resolveAction,
    entityName,
    formUpdate,
    formValidate,
    fields,
  } = props;

  return (
    <MakeAsyncFunction
      listener={promiseListener}
      start={startAction.type}
      resolve={resolveAction.type}
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
        log("Get Customer ACTION :", action);

        if (action.payload.data != null) {
          openNotifier("success", `${entityName} is saved!`);
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
            initialValues={{ ...props.vuEntityObj }}
            mutators={{}}
            decorators={[]}
            validate={formValidate}
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
                <CustomFormWr
                  {...{
                    form,
                    values,
                    dataFromServer,
                    formInitFn: formUpdate,
                  }}
                >
                  <form onSubmit={handleSubmit}>
                    <Paper>
                      <FlowLayout column>
                        <Typography>{entityName}</Typography>
                        {touched["phone"] && touched["email"] && (
                          <FFShowError
                            error={error}
                            submitError={submitError}
                          />
                        )}

                        {fields.map((field, index) => {
                          switch (field.inputType) {
                            case "text":
                              return (
                                <Field
                                  name={field.fieldName}
                                  key={field.fieldName}
                                >
                                  {({ input, meta }) => (
                                    <Typography>
                                      {field.description}: {input.value}
                                    </Typography>
                                  )}
                                </Field>
                              );

                            case "textInput":
                              return (
                                <Field
                                  name={field.fieldName}
                                  key={field.fieldName}
                                >
                                  {({ input, meta }) => (
                                    <>
                                      <TextField
                                        {...input}
                                        size="small"
                                        label={field.description}
                                        variant="outlined"
                                        placeholder={field.placeHolder}
                                      />
                                      <FFShowError meta={meta} />
                                    </>
                                  )}
                                </Field>
                              );
                          }
                        })}

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
                  </form>
                </CustomFormWr>
              );
            }}
          </Form>
        );
      }}
    </MakeAsyncFunction>
  );
}
