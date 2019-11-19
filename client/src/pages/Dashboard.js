import React, { Component } from "react";

import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import Mentions from "./Mentions";
import Platforms from "./Platforms";
import Navbar from "./Navbar";

const dashboardStyle = theme => ({
  rightGridContainer: {
    borderLeft: '1px solid black',
    height: '100%'
  }
});

class Dashboard extends Component {
  state = {
    platforms: [
      {name: "Reddit", inUse: true},
      {name: "Twitter", inUse: true},
      {name: "Facebook", inUse: true},
      {name: "Amazon", inUse: true},
      {name: "Forbes", inUse: true},
      {name: "Shopify", inUse: true},
      {name: "Business Insider", inUse: true}
    ],
    mentions: [
      {title: 'thing happened', platform: 'Reddit', desc: 'qwerty'},
      {title: 'consume', platform: 'Forbes', desc: '12345'},
      {title: 'buy', platform: 'Shopify', desc: 'abc123'},
      {title: 'do', platform: 'Business Insider', desc: 'aedsfadwsf'}
    ],
    sort: 0
  };

  handlePlatformChange = (key) => {
    this.setState(prevState => {
      const platforms = prevState.platforms.map((platform, i) => {
        if (i === key) {
          platform.inUse = !platform.inUse;
        }
        return platform;
      });
      return { platforms }
    })
  }

  handleSortChange = (event, sort) => {
    console.log(sort)
    this.setState(prevState => ({
      sort
    }));
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.dashboardContainer}>
        <Navbar
          where="dashboard"
        />
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <Platforms
              platforms={this.state.platforms}
              handleChange={this.handlePlatformChange}
            />
          </Grid>
          <Grid item xs={8} className={classes.rightGridContainer}>
            <Mentions
              mentions={this.state.mentions}
              sort={this.state.sort}
              handleChange={this.handleSortChange}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(Dashboard);
