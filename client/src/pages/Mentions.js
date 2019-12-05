import React, { useState } from "react";
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
  header: {
    marginBottom: "20px",
    height: window.innerWidth > 1024 ? "50px" : "100px"
  }
}));

function Mentions(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const mentions = props.mentions.map((mention, i) => {
    if (!localStorage.getItem(`${mention.link}`)) {
      localStorage.setItem(`${mention.link}`, JSON.stringify(mention));
    }
    return <Mention key={i} mention={mention} index={i} setOpen={setOpen} />;
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
        render={reactRouterPropss => {
          return (
            <MentionDialog
              {...reactRouterPropss}
              mentions={props.mentions}
              setOpen={setOpen}
              open={open}
            />
          );
        }}
      />
    </div>
  );
}

export default Mentions;
