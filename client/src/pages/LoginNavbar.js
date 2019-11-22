import React from "react";

import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  title: {
    width: "160px"
  },
  titlePart: {
    color: "#30336b"
  },
  search: {
    width: "50%",
    height: "90%",
    borderRadius: "50px",
    margin: "auto"
  },
  input: {
    width: "calc(100% - 58px)",
    marginLeft: "10px"
  },
  settings: {
    float: "right"
  }
}));

const LoginNavbar = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            mentions<span className={classes.titlePart}>crawler</span>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default LoginNavbar;
