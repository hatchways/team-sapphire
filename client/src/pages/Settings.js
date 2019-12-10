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
    backgroundColor: "#fafbff",
    height: "calc(100vh - 92px)",
    width: "72%",
    borderLeft: "2px solid #e9eaee"
  },
  leftGridContainer: {
    height: "calc(100vh - 92px)",
    width: "28%"
  }
}));

const Settings = () => {
  const classes = useStyles();
  const history = useHistory();
  const [companyNames, setCompanyNames] = useState([]);
  const [companies, setCompanies] = useState([]);
  const platforms = {
    Reddit: true,
    Twitter: true,
    Facebook: true,
    Amazon: true,
    Forbes: true,
    Shopify: true,
    "Business Insider": true
  };

  useEffect(() => {
    if (!localStorage.getItem("email")) handleLogout();
    axios
      .get(`/settings/${localStorage.getItem("email")}/company`)
      .then(res => {
        setCompanyNames(res.data.companies);
        setCompanies(res.data.settings.companies);
      });
  }, []);

  const handleLogout = async () => {
    let response = await axios.post("/logout");
    if (response.data.success) {
      localStorage.clear();
      history.push("/login");
    }
  };

  return (
    <div className={classes.dashboardContainer}>
      <Navbar platforms={platforms} companies={companies} />
      <Grid container spacing={0}>
        <Grid item className={classes.leftGridContainer}>
          <LeftSideBar />
        </Grid>
        <Grid item className={classes.rightGridContainer}>
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
