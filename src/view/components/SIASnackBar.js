import { Snackbar, SnackbarContent } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

let setNotifMsgHandle;

const styles = makeStyles((theme) => ({
  root: {
    backgroundColor: "green",
  },
  message: {
    backgroundColor: "green",
    color: "black",
  },
}));

export function SIASnackBar(props) {
  const classes = styles();
  useEffect(() => {
    setNotifMsgHandle = setNotifMsg;
  }, []);

  const [notifMsg, setNotifMsg] = useState({
    type: "success",
    message: "This is a success message!",
    openFlag: false,
  });

  return (
    <Snackbar
      open={notifMsg.openFlag}
      autoHideDuration={6000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      onClose={() => {
        setNotifMsg({ openFlag: false });
        // return null;
      }}
    >
      <SnackbarContent
        classes={classes}
        message={notifMsg.message}
      ></SnackbarContent>
    </Snackbar>
  );
}

export function openNotifier(type, message) {
  setNotifMsgHandle({ type, message, openFlag: true });
}
