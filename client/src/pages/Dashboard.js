import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
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
    width: "72%"
  },
  leftGridContainer: {
    height: "calc(100vh - 92px)",
    paddingTop: "25px",
    width: "28%"
  }
}));

function Dashboard() {
  const socket = window.io("", {
    autoConnect: false
  });

  const history = useHistory();
  const [platforms, setPlatforms] = useState({});
  const [mentions, setMentions] = useState([]);
  const [displayedMentions, setDisplay] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [sort, setSort] = useState(0);
  useEffect(() => {
    if (!localStorage.getItem("email")) {
      handleLogout();
    } else {
      if (history.location.search.length > 0) {
        const query = queryString.parse(history.location.search);
        console.log(query);
        axios
          .get(`/search/searchbar`, {
            params: {
              companies: query.companies.split(","),
              platforms: query.platforms.split(","),
              search: query.search
            }
          })
          .then(res => {
            setMentions(res.data.mentions);
            //empty array since we are not using the mentions model yet
          })
          .catch(error => {
            console.error(error);
          });
      }
      axios
        .get(`/settings/${localStorage.getItem("email")}/mentions`)
        .then(res => {
          if (res.data.authenticated === false) {
            handleLogout();
          } else if (res.data.success) {
            socket.connect();
            setPlatforms(res.data.settings.platforms);
            setCompanies(res.data.settings.companies);
            setMentions(res.data.mentions);
            setDisplay(res.data.filtered);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
    return () => socket.disconnect();
  }, []);

  const handlePlatformToggle = platform => {
    let newPlatforms = platforms;
    newPlatforms[platform] = !newPlatforms[platform];
    setDisplay(
      mentions.filter(mention => {
        return newPlatforms[mention.platform] === true;
      })
    );
    axios
      .put(`/settings/${localStorage.getItem("email")}/platform/${platform}`)
      .then(res => {
        if (res.data.authenticated === false) {
          handleLogout();
        } else if (res.data.success) {
          setPlatforms(res.data.settings.platforms);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSortChange = (event, sort) => {
    setSort(sort);
  };

  const handleLogout = async () => {
    let response = await axios.post("http://localhost:4000/logout");
    if (response.data.success) {
      socket.disconnect();
      localStorage.clear();
      history.push("/login?redirect=dashboard");
    }
  };
  const classes = useStyles();
  return (
    <div>
      <Navbar platforms={platforms} companies={companies} />
      <Grid container spacing={0}>
        <Grid item className={classes.leftGridContainer}>
          <Platforms
            platforms={platforms}
            handleChange={handlePlatformToggle}
          />
        </Grid>
        <Grid item className={classes.rightGridContainer}>
          <Mentions
            mentions={displayedMentions}
            sort={sort}
            handleChange={handleSortChange}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
