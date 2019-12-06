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
    backgroundColor: "#fafbff",
    height: "calc(100vh - 92px)",
    overflow: "scroll",
    borderLeft: "2px solid #e9eaee",
    width: "72vw"
  },
  leftGridContainer: {
    height: "calc(100vh - 92px)",
    paddingTop: "25px",
    width: "28vw"
  }
}));

function Dashboard() {
  const socket = window.io("", {
    autoConnect: false
  });

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
  useEffect(() => {
    if (!localStorage.getItem("email")) handleLogout();
    axios
      .get(`/settings/${localStorage.getItem("email")}`)
      .then(res => {
        if (res.data.authenticated === false) {
          handleLogout();
        } else if (res.data.success) {
          socket.connect();
          setPlatforms(res.data.settings.platforms);
          setCompanies(res.data.settings.companies);
          setMentions(res.data.mentions.Reddit);
        }
      })
      .catch(error => {
        console.error(error);
      });
      return socket.disconnect();
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

  const handleSearchSubmit = event => {
    event.preventDefault();
    console.log(
      event.target.searchfield.value,
      event.target.companyfield.value,
      event.target.platformfield.value
    );
  };

  const handleLogout = async () => {
    let response = await axios.post("http://localhost:4000/logout");
    if (response.data.success) {
      socket.disconnect();
      localStorage.clear();
      history.push("/login");
    }
  };

  const classes = useStyles();
  return (
    <div>
      <Navbar
        showSearch={true}
        platforms={platforms}
        companies={companies}
        handleSubmit={handleSearchSubmit}
      />
      <Grid container spacing={0}>
        <Grid item className={classes.leftGridContainer}>
          <Platforms
            platforms={platforms}
            handleChange={handlePlatformToggle}
          />
        </Grid>
        <Grid item className={classes.rightGridContainer}>
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
