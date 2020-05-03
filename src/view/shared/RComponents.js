/*
    Building stateless component wraps that just gives default values to component and additional labels if necessarry...
*/

import React from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import { Button, Link, Typography } from "@material-ui/core";
import seqVal from "./SequenceGen";
import { makeStyles } from "@material-ui/core/styles";

//Any function that returns JSX expressins should start with Capital letters.

import { withTheme } from "@material-ui/core/styles";
// style = {{width : props.inputLen}}

export function RTextField(props) {
  var defProps = {
    size: "medium",
    id: "RRTF-" + seqVal(),
    type: "text",
    variant: "outlined",
    label: "default1",
  };

  let composedProps = { ...defProps, ...props };

  return <TextField variant="outlined" {...composedProps} />;
}
