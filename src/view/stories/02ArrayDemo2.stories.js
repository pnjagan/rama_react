import React, { useState, useEffect } from "react";
import { FlowLayout } from "../shared/LayoutHelper";

import { Typography, Paper, TextField, Button } from "@material-ui/core";

import { Form, Field, FormSpy } from "react-final-form";
import { reduxPromiseListener as promiseListener } from "../../index";
import { FORM_ERROR } from "final-form";
import MakeAsyncFunction from "react-redux-promise-listener";

import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { log } from "../../state/utils";

export default { title: "02 - Array Demo 2" };

const R = require("ramda");

const validate = () => {};

const listOfFields = ["customerNum", "customerName", "AddressLine1"];

export const CustSearch = () => {
  const onSubmit = async (values) => {
    // await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
  };

  return (
    <Form
      onSubmit={onSubmit}
      mutators={{
        // potentially other mutators could be merged here
        ...arrayMutators,
      }}
      validate={validate}
      render={({ handleSubmit, pristine, invalid }) => (
        <form onSubmit={handleSubmit}>
          <FieldArray name="searchCriteria">
            {(props) => {
              log("props :", props);
              let { fields } = props;

              return (
                <div>
                  {fields.map((criteria, index) => {
                    log("criteria :", index, " - ", criteria);

                    return (
                      <div key={`Row#${index}`}>
                        <div>
                          <label>{criteria}</label>

                          <Field name={`${criteria}`} component="input" />
                        </div>

                        <button
                          type="button"
                          onClick={() => fields.remove(index)}
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}

                  {/* Footer */}
                  <button
                    type="button"
                    onClick={() =>
                      fields.push({ criteria: "customerName", value: "" })
                    }
                  >
                    Add
                  </button>
                </div>
              );
            }}
          </FieldArray>

          <Button type="submit">Save</Button>
        </form>
      )}
    />
  );
};
