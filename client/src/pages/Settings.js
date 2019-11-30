import React, { useState, useEffect } from "react";

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
  const [companies, setCompanies] = useState([]);
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
  const [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [selectedPlatform, setSelectedPlatform] = useState("All Platforms");
  const [isPlatformOpen, setPlatformOpen] = useState(false);
  const [isCompanyOpen, setCompanyOpen] = useState(false);

  const handlePlatformClose = (event) => {
    setPlatformOpen(false);
  }

  const handlePlatformOpen = (event) => {
    setPlatformOpen(true);
  }

  const handlePlatformChange = (event) => {
    setSelectedPlatform(event.target.value);
  }

  const handleCompanyClose = (event) => {
    setCompanyOpen(false);
  }

  const handleCompanyOpen = (event) => {
    setCompanyOpen(true);
  }

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
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
  return (
    <div className={classes.dashboardContainer}>
      <Navbar
        showSearch={true}
        searchInput={searchInput}
        onSearchChange={onSearchChange}
        platforms={platforms}
        selectedPlatform={selectedPlatform}
        isPlatformOpen={isPlatformOpen}
        handlePlatformClose={handlePlatformClose}
        handlePlatformOpen={handlePlatformOpen}
        handlePlatformChange={handlePlatformChange}
        companies={companies}
        selectedCompany={selectedCompany}
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
          <SettingsBody />
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
