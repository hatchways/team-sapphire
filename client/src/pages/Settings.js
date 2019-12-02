import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const [companyNames, setCompanyNames] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    axios
      .get(`/settings/${localStorage.getItem("email")}/company`)
      .then(res => setCompanyNames(res.data.companies));
  }, []);

  return (
    <div className={classes.dashboardContainer}>
      <Navbar showSearch={true} />
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <LeftSideBar />
        </Grid>
        <Grid item xs={8} className={classes.rightGridContainer}>
          <SettingsBody
            companyNames={companyNames}
            setCompanyNames={setCompanyNames}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
