import React, { Component } from "react";

import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import Mentions from "./Mentions";
import PlatformList from "./PlatformList";

const dashboardStyle = theme => ({
  landingContainer: {

  }
});

class Dashboard extends Component {
  state = {
    platforms: [{name: "Reddit", inUse: true},
                {name: "Twitter", inUse: true},
                {name: "Facebook", inUse: true},
                {name: "Amazon", inUse: true},
                {name: "Forbes", inUse: true},
                {name: "Shopify", inUse: true},
                {name: "Business Insider", inUse: true}]
  };

  componentDidMount() {

  }

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
      <div className={classes.landingContainer}>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <PlatformList
              platforms={this.state.platforms}
              handleChange={this.handlePlatformChange}
            />
          </Grid>
          <Grid item xs={8}>
            <Mentions
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(Dashboard);
