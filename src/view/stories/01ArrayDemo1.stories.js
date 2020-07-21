import React, { useState, useEffect } from "react";
import { FlowLayout } from "../shared/LayoutHelper";

import { Typography, Paper, TextField, Button } from "@material-ui/core";

import { log } from "../../state/utils";

import { Form, Field, FormSpy } from "react-final-form";
import { reduxPromiseListener as promiseListener } from "../../index";
import { FORM_ERROR } from "final-form";
import MakeAsyncFunction from "react-redux-promise-listener";

const R = require("ramda");

export default { title: "01 -     Array Demo 1" };

export const CustSearchDemo = () => {
  // let listOfSearchCriteria =

  const [listOfSearchCriteria, setListOfSearchCriteria] = useState([]);

  const [itemSeq, setItemSeq] = useState(0);

  // const onSubmit = async (values) => {
  //   // await sleep(300);
  //   window.alert(JSON.stringify(values, 0, 2));
  // };

  const addRow = () => {
    setItemSeq(itemSeq + 1);
    console.log("itemSeq :", itemSeq);

    setListOfSearchCriteria(
      R.append(
        {
          fieldName: "Name",
          value: "hari",
          key: itemSeq,
          onCV: function (nv) {
            this.value = nv;
          },
        },
        listOfSearchCriteria
      )
    );
  };

  const removeRow = (key) => {
    // console.log("Remove :", index);

    log("listOfSearchCriteria", listOfSearchCriteria);
    setListOfSearchCriteria(
      R.filter((e) => {
        log(" E ", e);
        return e.key !== key;
      }, listOfSearchCriteria)
    );
  };

  // return <div> Hare Krishna</div>;

  return (
    <Paper>
      <FlowLayout column>
        <Typography>Search customers</Typography>

        <FlowLayout column>
          {listOfSearchCriteria.map((rec, index) => {
            return (
              <React.Fragment key={"RF:" + rec.key}>
                <TextField
                  size="medium"
                  label={rec.fieldName + ":" + rec.key}
                  variant="outlined"
                  id={"TF:" + rec.id}
                  // inputProps={{ value: rec.value }}
                  defaultValue={rec.value}
                  onChange={(e) => {
                    // log("e", e.target.value);
                    rec.onCV(e.target.value);
                  }}
                />
                <Button
                  onClick={(e) => {
                    console.log("Remove IND:", index, " Key :", rec.key);
                    removeRow(rec.key);
                  }}
                >
                  remove
                </Button>
              </React.Fragment>
            );
          })}
        </FlowLayout>
        <Button
          onClick={(e) => {
            addRow();
          }}
        >
          ADD
        </Button>

        <Button type="submit">Go</Button>
      </FlowLayout>
    </Paper>
  );
};
