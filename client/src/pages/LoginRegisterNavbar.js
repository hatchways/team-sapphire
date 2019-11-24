import React from "react";

import { AppBar, Toolbar, Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withTheme } from "@material-ui/styles";

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
  },
  loginRegisterButton: {
    border: "1px solid white",
    borderRadius: "20px",
    color: "white",
    width: "100px",
    marginLeft: "10px",
    fontSize: "12px"
  },
  linkTitle: {
    color: "white"
  }
}));

const LoginNavbar = ({ showRegister = false }) => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h6" noWrap className={classes.title}>
                mentions<span className={classes.titlePart}>crawler.</span>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption" className={classes.linkTitle}>
                {" "}
                {showRegister
                  ? "Already have an account?"
                  : "Don't have an account"}
              </Typography>
              <Button
                variant="outlined"
                href={showRegister ? "/login" : "/register"}
                className={classes.loginRegisterButton}
              >
                {showRegister ? "Login" : "Register"}
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default LoginNavbar;
