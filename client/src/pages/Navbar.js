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
    width: "160px"
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
    width: "100vh",
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
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h6" noWrap className={classes.title}>
                mentions<span className={classes.titlePart}>crawler.</span>
              </Typography>
            </Grid>

            {showSearch && loggedIn && (
              <>
                <Grid>
                  <Paper component="form" className={classes.search}>
                    <InputBase
                      placeholder="Search Company Name..."
                      className={classes.input}
                    />
                    <IconButton type="submit" aria-label="search">
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </Grid>
                <Grid>
                  <IconButton className={classes.settings}>
                    <SettingsIcon />
                  </IconButton>
                </Grid>
              </>
            )}
            {showSearch && !loggedIn && loginToggle && (
              <>
                <Grid item>
                  <Paper component="form" className={classes.search}>
                    <InputBase
                      placeholder="Search Company Name..."
                      className={classes.input}
                    />
                    <IconButton type="submit" aria-label="search">
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </Grid>
                <Grid>
                  <IconButton className={classes.settings}>
                    <SettingsIcon />
                  </IconButton>
                </Grid>
              </>
            )}
            {showSearch && !loggedIn && !loginToggle && (
              <>
                <Grid item>
                  <Paper component="form" className={classes.search}>
                    <InputBase
                      placeholder="Search Company Name..."
                      className={classes.input}
                    />
                    <IconButton type="submit" aria-label="search">
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </Grid>
                <Grid item>
                  <IconButton className={classes.settings}>
                    <SettingsIcon />
                  </IconButton>
                </Grid>
              </>
            )}

            {!showSearch && (
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
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
