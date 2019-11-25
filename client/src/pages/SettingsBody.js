import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  bodyContainer: {
    backgroundColor: "#fafbff",
    height: "100vh"
  }
}));
const SettingsBody = () => {
  const classes = useStyles();

  return <div className={classes.bodyContainer}></div>;
};

export default SettingsBody;
