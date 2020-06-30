import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  error: {
    color: "red",
  },
}));

//Either pass meta for field
//or error, submitError for form error
export function FFShowError(props) {
  const classes = useStyles();
  if (props.meta != null) {
    const meta = props.meta;

    return (
      <>
        {meta.submitError && meta.touched && (
          <span className={classes.error}>{meta.submitError}</span>
        )}
        {meta.error && meta.touched && (
          <span className={classes.error}>{meta.error}</span>
        )}
      </>
    );
  } else if (props.error != null || props.submitError != null) {
    return (
      <div>
        <span className={classes.error}>{props.error}</span>
        <span className={classes.error}>{props.submitError}</span>
      </div>
    );
  } else {
    return <></>;
  }
}
