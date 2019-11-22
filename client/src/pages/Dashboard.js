import React, { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import Mentions from "./Mentions";
import Platforms from "./Platforms";
import Navbar from "./Navbar";

const useStyles = makeStyles(theme => ({
  rightGridContainer: {
    borderLeft: '1px solid black',
    height: '100%'
  }
}));

function Dashboard() {
  const [platforms, setPlatforms] = useState([
    {name: "Reddit", inUse: true},
    {name: "Twitter", inUse: true},
    {name: "Facebook", inUse: true},
    {name: "Amazon", inUse: true},
    {name: "Forbes", inUse: true},
    {name: "Shopify", inUse: true},
    {name: "Business Insider", inUse: true}
  ]);
  const [mentions, setMentions] = useState([
    {title: 'thing happened', platform: 'Reddit', desc: 'qwerty'},
    {title: 'consume', platform: 'Forbes', desc: '12345'},
    {title: 'buy', platform: 'Shopify', desc: 'abc123'},
    {title: 'do', platform: 'Business Insider', desc: 'aedsfadwsf'}
  ]);
  const [sort, setSort] = useState(0);

  const handlePlatformChange = (key) => {
    let updatedPlatforms = [...platforms];
    updatedPlatforms[key].inUse = !updatedPlatforms[key].inUse;
    setPlatforms(updatedPlatforms);
  }

  const handleSortChange = (event, sort) => {
    setSort(sort);
  }

  const classes = useStyles();
  return (
    <div className={classes.dashboardContainer}>
      <Navbar
      />
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
