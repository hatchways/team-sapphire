import React from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  Grid,
  Paper,
  IconButton
} from "@material-ui/core";

import SettingsIcon from "@material-ui/icons/Settings";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  title: {
    width: "160px",
    overflow: "visible"
  },
  loginTitle: {
    width: "160px",
    overflow: "visible",
    flexGrow: 1
  },
  titlePart: {
    color: "#30336b"
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
  },
  search: {
    width: "calc(100vh - 160px)",
    height: "90%",
    borderRadius: "50px",
    margin: "auto"
  },
  input: {
    width: "calc(100% - 58px)",
    marginLeft: "10px"
  }
}));

const Navbar = ({
  showSearch = false,
  showRegister = false,
  loggedIn = false,
  loginToggle = false
}) => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {showSearch && (
            <>
              <Typography variant="h6" noWrap className={classes.title}>
                mentions<span className={classes.titlePart}>crawler.</span>
              </Typography>
              <Paper component="form" className={classes.search}>
                <InputBase
                  placeholder="Search Company Name..."
                  className={classes.input}
                />
                <IconButton type="submit" aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>
              <IconButton>
                <SettingsIcon />
              </IconButton>
            </>
          )}
          {!showSearch && (
            <>
              <Typography variant="h6" noWrap className={classes.loginTitle}>
                mentions<span className={classes.titlePart}>crawler.</span>
              </Typography>
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
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
