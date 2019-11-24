import React from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "./Navbar";
import SettingsBody from "./SettingsBody";
import LefSidetBar from "./LefSidetBar";

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
          <LefSidetBar />
        </Grid>
        <Grid item xs={8} className={classes.rightGridContainer}>
          <SettingsBody />
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
