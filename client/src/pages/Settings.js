import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
  useEffect(() => {
    if(!localStorage.getItem("email")) handleLogout();
    axios
      .get(`/settings/${localStorage.getItem("email")}/company`)
      .then(res => setCompanyNames(res.data.companies));
  }, []);

  const handleLogout = async () => {
    let response = await axios.post("http://localhost:4000/logout");
    if (response.data.success) {
      localStorage.clear();
      history.push("/login");
    }
  };

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
