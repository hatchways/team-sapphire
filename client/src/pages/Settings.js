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
    backgroundColor: '#fafbff',
    height: "100vh",
    width: "72vw",
    borderLeft: "2px solid #e9eaee"
  },
  leftGridContainer: {
    height: "100vh",
    width: "28vw"
  }
}));

const Settings = () => {
  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem("email")) handleLogout();
    axios
      .get(`/settings/${localStorage.getItem("email")}/company`)
      .then(res => setCompanyNames(res.data.companies));
  }, []);

  const [companyNames, setCompanyNames] = useState([]);
  const [platforms, setPlatforms] = useState({
    Reddit: true,
    Twitter: true,
    Facebook: true,
    Amazon: true,
    Forbes: true,
    Shopify: true,
    "Business Insider": true
  });

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.searchfield.value, event.target.companyfield.value, event.target.platformfield.value);
  }

  const handleLogout = async () => {
    let response = await axios.post("/logout");
    if (response.data.success) {
      localStorage.clear();
      history.push("/login");
    }
  };

  return (
    <div className={classes.dashboardContainer}>
      <Navbar
        showSearch={true}
        platforms={platforms}
        companies={companyNames}
        handleSubmit={handleSearchSubmit}
      />
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
