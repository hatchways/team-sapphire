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
  const [platforms, setPlatforms] = useState({
    Reddit: true,
    Twitter: true,
    Facebook: true,
    Amazon: true,
    Forbes: true,
    Shopify: true,
    "Business Insider": true
  });
  const [searchInput, setSearch] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [isPlatformOpen, setPlatformOpen] = useState(false);
  const [isCompanyOpen, setCompanyOpen] = useState(false);

  const handlePlatformClose = (event) => {
    setPlatformOpen(false);
  }

  const handlePlatformOpen = (event) => {
    setPlatformOpen(true);
  }

  const handlePlatformChange = (event) => {
    setSelectedPlatforms(event.target.value);
  }

  const handleCompanyClose = (event) => {
    setCompanyOpen(false);
  }

  const handleCompanyOpen = (event) => {
    setCompanyOpen(true);
  }

  const handleCompanyChange = (event) => {
    setSelectedCompanies(event.target.value);
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.searchfield.value, event.target.companyfield.value, event.target.platformfield.value);
    setSearch("");
  }

  const onSearchChange = (event) => {
    setSearch(event.target.value);
  }

  const classes = useStyles();
  useEffect(() => {
    axios
      .get(`/settings/${localStorage.getItem("email")}/company`)
      .then(res => setCompanyNames(res.data.companies));
  }, []);

  return (
    <div className={classes.dashboardContainer}>
      <Navbar
        showSearch={true}
        searchInput={searchInput}
        onSearchChange={onSearchChange}
        platforms={platforms}
        selectedPlatforms={selectedPlatforms}
        isPlatformOpen={isPlatformOpen}
        handlePlatformClose={handlePlatformClose}
        handlePlatformOpen={handlePlatformOpen}
        handlePlatformChange={handlePlatformChange}
        companies={companyNames}
        selectedCompanies={selectedCompanies}
        isCompanyOpen={isCompanyOpen}
        handleCompanyClose={handleCompanyClose}
        handleCompanyOpen={handleCompanyOpen}
        handleCompanyChange={handleCompanyChange}
        handleSubmit={handleSearchSubmit}
      />
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
