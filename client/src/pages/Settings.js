import React from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "./Navbar";
import SettingsRightBar from "./SettingsRightBar";
import SettingsLeftBar from "./SettingsLeftBar";

const useStyles = makeStyles(theme => ({
  rightGridContainer: {
    borderLeft: "1px solid black",
    height: "100%"
  }
}));

const Settings = () => {
  const classes = useStyles();
  return (
    <div className={classes.dashboardContainer}>
      <Navbar where="dashboard" />
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <SettingsLeftBar />
        </Grid>
        <Grid item xs={8} className={classes.rightGridContainer}>
          <SettingsRightBar />
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
