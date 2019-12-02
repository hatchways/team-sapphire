import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Mentions from "./Mentions";
import Platforms from "./Platforms";
import Navbar from "./Navbar";

const useStyles = makeStyles(theme => ({
  rightGridContainer: {
    borderLeft: "1px solid black",
    height: "100%"
  }
}));

function Dashboard() {
  const history = useHistory();

  const [platforms, setPlatforms] = useState({
    Reddit: true,
    Twitter: true,
    Facebook: true,
    Amazon: true,
    Forbes: true,
    Shopify: true,
    "Business Insider": true
  });
  const [mentions, setMentions] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [sort, setSort] = useState(0);
  const [searchInput, setSearch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [selectedPlatform, setSelectedPlatform] = useState("All Platforms");
  const [isPlatformOpen, setPlatformOpen] = useState(false);
  const [isCompanyOpen, setCompanyOpen] = useState(false);
  useEffect(() => {
    axios
      .get(`/settings/${localStorage.getItem("email")}`)
      .then(res => {
        if (res.data.authenticated === false) {
          handleLogout();
        } else if (res.data.success) {
          setPlatforms(res.data.settings.platforms);
          setCompanies(res.data.settings.companies);
          setMentions(res.data.mentions.Reddit);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handlePlatformToggle = platform => {
    axios
      .put(`/settings/${localStorage.getItem("email")}/platform/${platform}`)
      .then(res => {
        if (res.data.authenticated === false) {
          handleLogout();
        } else if (res.data.success) {
          setPlatforms(res.data.settings.platforms);
          console.log(platforms);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSortChange = (event, sort) => {
    setSort(sort);
  };

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
  
  const handleLogout = async () => {
    let response = await axios.post("http://localhost:4000/logout");
    if (response.data.success) {
      localStorage.clear();
      history.push("/login");
    }
  };

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
          <Platforms
            platforms={platforms}
            handleChange={handlePlatformToggle}
          />
        </Grid>
        <Grid item xs={8} className={classes.rightGridContainer}>
          <Mentions
            mentions={mentions}
            sort={sort}
            handleChange={handleSortChange}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
