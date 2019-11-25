import React from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "./Navbar";
import SettingsBody from "./SettingsBody";
import LeftSideBar from "./LeftSideBar";

const useStyles = makeStyles(theme => ({
  rightGridContainer: {
    height: "100%"
  }
}));

const Settings = () => {
  const classes = useStyles();
  return (
    <div className={classes.dashboardContainer}>
      <Navbar showSearch={true} />
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <LeftSideBar />
        </Grid>
        <Grid item xs={8} className={classes.rightGridContainer}>
          <SettingsBody />
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
