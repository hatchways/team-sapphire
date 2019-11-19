import React, { Component } from "react";

import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import Mentions from "./Mentions";
import Platforms from "./Platforms";

const dashboardStyle = theme => ({
  dashboardContainer: {

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
    sortByRecent: true
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

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.dashboardContainer}>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <Platforms
              platforms={this.state.platforms}
              handleChange={this.handlePlatformChange}
            />
          </Grid>
          <Grid item xs={8}>
            <Mentions
              sortByRecent={this.state.sortByRecent}
              mentions={this.state.mentions}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(Dashboard);
