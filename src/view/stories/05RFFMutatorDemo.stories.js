import React, { useState, useEffect } from "react";
import { Form, Field } from "react-final-form";

import { Button } from "@material-ui/core";
import { log } from "../../state/utils";

export default { title: "05 - RFF - mutator demo" };

const validate = () => {};

const setValue = ([name, newValue], state, { changeValue }) => {
  changeValue(state, name, (value) => newValue);
};

export const RFFMDemo = () => {
  const onSubmit = async (values) => {
    // await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
  };

  return (
    <Form
      onSubmit={onSubmit}
      mutators={{ setValue }}
      validate={validate}
      render={({ handleSubmit, pristine, invalid, form, values }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Madhava</label>
            <Field
              name="Vishnu.Madhava"
              component="input"
              type="text"
              placeholder="Hare Krishna"
            />
          </div>

          <div>
            <label>Govinda</label>
            <Field
              name="Vishnu.Govinda"
              component="input"
              type="text"
              placeholder="Hare Krishna"
            />
          </div>

          <div>
            <label>Krishna Counter</label>
            <Field
              name="Krishna"
              component="input"
              type="text"
              placeholder="Hare Krishna"
            />
          </div>

          <div>
            <label>Avatars 1</label>
            <Field
              name="avatar[0]"
              component="input"
              type="text"
              placeholder="Macha"
            />
            <Button>-</Button>
          </div>

          <div>
            <label>Avatars 2</label>
            <Field
              name="avatar[1]"
              component="input"
              type="text"
              placeholder="Kurma"
            />
            <Button>-</Button>
          </div>

          <div>
            <label>Avatars 3</label>
            <Field
              name="avatar[2]"
              component="input"
              type="text"
              placeholder="Varaha"
            />
            <Button>-</Button>
          </div>
          <Button type="submit">Save</Button>

          <Button
            onClick={() => {
              console.log("On Click");
              let krishnaVal = values.Krishna;
              form.mutators.setValue("Krishna", krishnaVal + " hare");
            }}
          >
            Add Krishna
          </Button>
        </form>
      )}
    />
  );
};
