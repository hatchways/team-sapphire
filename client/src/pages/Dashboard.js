import React, { useState, useEffect } from "react";
import axios from "axios";
import io from 'socket.io-client';
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
  const socket = io('', {
    autoConnect: false
  });

  const history = useHistory();
  if (!localStorage.getItem("email")) {
    history.push("/register");
  }
  const [platforms, setPlatforms] = useState({
    Reddit: true,
    Twitter: true,
    Facebook: true,
    Amazon: true,
    Forbes: true ,
    Shopify: true,
    "Business Insider": true
  });
  const [mentions, setMentions] = useState([]);
  // { title: "example title", platform: "Reddit", desc: "qwerty" },
  // { title: "example title", platform: "Forbes", desc: "12345" },
  // { title: "example title", platform: "Shopify", desc: "abc123" },
  // { title: "example title", platform: "Business Insider", desc: "aedsfadwsf" }
  const [companies, setCompanies] = useState([]);
  const [sort, setSort] = useState(0);
  useEffect(() => {
    axios
      .get(`/settings/${localStorage.getItem("email")}`)
      .then(res => {
        if (res.data.success) {
          socket.connect();
          setPlatforms(res.data.settings.platforms);
          setCompanies(res.data.settings.companies);
          res.data.settings.companies.forEach(company => {
            axios
              .get(`/reddit/search/new/${company}`)
              .then(res => {
                if (res.data.success) {
                  setMentions(res.data.submissions);
                }
              })
              .catch(error => {
                console.error(error)
              })
          })
        }
      })
      .catch(error => {
        console.error(error)
      })
  }, []);

  const handlePlatformChange = platform => {
    axios
      .put(`/settings/${localStorage.getItem("email")}/platform/${platform}`)
      .then(res => {
        if (res.data.success) {
          setPlatforms(res.data.settings.platforms);
          console.log(platforms)
        }
      })
      .catch(error => {
        console.error(error)
      })
  };

  const handleSortChange = (event, sort) => {
    setSort(sort);
  };

  const classes = useStyles();
  return (
    <div className={classes.dashboardContainer}>
      <Navbar showSearch={true} />
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <Platforms
            platforms={platforms}
            handleChange={handlePlatformChange}
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
