import React from "react";
import { Route } from "react-router-dom";

import MentionDialog from "./MentionDialog";
import Mention from "./Mention";

import { Typography, Paper, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  mentionsContainer: {
    width: "75%",
    margin: "auto",
    marginTop: "10px"
  },
  sortToggleContainer: {
    float: "right",
    borderRadius: "50px",
    color: "#30336b"
  },
  cardContainer: {
    marginBottom: "10px",
    display: "flex",
    height: "18vh",
    maxHeight: "18vh"
  },
  cardImage: {
    width: "30%"
  },
  header: {
    marginBottom: "20px",
    height: window.innerWidth > 1024 ? "50px" : "100px"
  }
}));

function Mentions(props) {
  const classes = useStyles();
  const mentions = props.mentions.map((mention, i) => {
    return <Mention mention={mention} index={i} />;
  });

  return (
    <div className={classes.mentionsContainer}>
      <Typography variant="h4" className={classes.header}>
        My mentions
        <Paper className={classes.sortToggleContainer}>
          <Tabs
            value={props.sort}
            onChange={props.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            className={classes.sortToggleContainer}
          >
            <Tab label="Most recent" className={classes.sortToggleContainer} />
            <Tab label="Most popular" className={classes.sortToggleContainer} />
          </Tabs>
        </Paper>
      </Typography>
      {mentions}
      <Route
        path={`/dashboard/mentions/:mentionId`}
        render={reactRouterPropss => (
          <MentionDialog {...reactRouterPropss} mentions={props.mentions} />
        )}
      />
    </div>
  );
}

export default Mentions;
