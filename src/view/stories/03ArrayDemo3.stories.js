import React, { useState, useEffect } from "react";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { Button } from "@material-ui/core";
import { log } from "../../state/utils";

export default { title: "03 - Array Demo 3" };

const validate = () => {};

export const MyFFDemo = () => {
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
          <FieldArray name="customers">
            {({ fields }) => {
              log("fields", fields);
              return (
                <div>
                  {fields.map((name, index) => (
                    <div key={name}>
                      <div>
                        <label>First Name</label>
                        <Field name={`${name}.firstName`} component="input" />
                      </div>
                      <div>
                        <label>Last Name</label>
                        <Field name={`${name}.lastName`} component="input" />
                      </div>
                      <button
                        type="button"
                        onClick={() => fields.remove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => fields.push({ firstName: "", lastName: "" })}
                  >
                    Add
                  </button>
                </div>
              );
            }}
          </FieldArray>

          <div>
            <label>Slogan</label>
            <Field
              name="mantra"
              component="input"
              type="text"
              placeholder="Hare Krishna"
            />
          </div>

          <Button type="submit">Save</Button>
        </form>
      )}
    />
  );
};
