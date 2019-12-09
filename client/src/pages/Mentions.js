import React, { useState } from "react";
import { Route } from "react-router-dom";


import MentionDialog from "./MentionDialog";
import Mention from "./Mention";

import { Typography, Paper, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  mentionsContainer: {
    width: "50vw",
    marginLeft: "90px",
    marginTop: "50px"
  },
  sortToggleContainer: {
    float: "right",
    borderRadius: "50px",
    color: "#30336b",
    height: "50px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    marginRight: "20px",
    fontWeight: 900,
    lineHeight: "25px",
    letterSpacing: "1px",
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
        render={reactRouterProps => {
          return (
            <MentionDialog
              {...reactRouterProps}
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
