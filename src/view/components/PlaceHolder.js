import React from "react";

import { Paper, Typography } from "@material-ui/core";

export function PlaceHolder(props) {
  return (
    <Paper>
      <Typography variant="h5" style={{ padding: "20px" }}>
        Placeholder for {props.componentName} component
      </Typography>
    </Paper>
  );
}
