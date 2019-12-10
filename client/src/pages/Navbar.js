import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";

import Searchbar from './Searchbar';
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  Navbar: {
    backgroundColor: theme.appBlue,
    height: "92px",
    display: "flex",
    justifyContent: "center"
  },
  title: {
    marginLeft: "1%",
    width: "20%",
    overflow: "visible",
    fontWeight: 900,
    letterSpacing: "0.5px"
  },
  loginTitle: {
    width: "160px",
    overflow: "visible",
    flexGrow: 1
  },
  titlePart: {
    color: "#273f96"
  },
  loginRegisterButton: {
    border: "1px solid white",
    borderRadius: "20px",
    color: "white",
    width: "125px",
    height: "50%",
    marginLeft: "10px",
    fontSize: "12px"
  },
  linkTitle: {
    color: "white",
    marginRight: "15px"
  },
  search: {
    width: "48vw",
    height: "50px",
    borderRadius: "50px",
    paddingLeft: "10px",
    paddingTop: "5px",
    margin: "auto",
    fontWeight: 900
  },
  input: {
    width: "calc(100% - 58px - 140px - 140px)",
    marginLeft: "10px"
  },
  select: {
    marginRight: "5px",
    width: "135px",
    maxWidth: "135px"
  }
}));

const Navbar = ({
  companies = [],
  platforms = {}
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [userRedirect, setRedirect] = useState("");
  const [loginRegisterName, setLoginRegisterName] = useState("");
  const [loginRegisterMessage, setLoginRegisterMessage] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  useEffect(() => {
    const location = history.location.pathname;
    if (location.substring(0, 10) === "/dashboard" || location === "/settings") {
      setShowSearch(true);
    } else if (location === "/login") {
      setRedirect(`/register${history.location.search}`);
      setLoginRegisterName("Sign Up");
      setLoginRegisterMessage("Don't have an account?");
    } else if (location === "/register") {
      setRedirect(`/login${history.location.search}`);
      setLoginRegisterName("Login");
      setLoginRegisterMessage("Already have an account?");
    }
  }, []);

  return (
    <div>
      <AppBar position="sticky" className={classes.Navbar}>
        <Toolbar>
          {showSearch && (
            <>
              <Typography variant="h6" noWrap className={classes.title}>
                mentions<span className={classes.titlePart}>crawler.</span>
              </Typography>
              <Searchbar
                companies = {companies}
                platforms = {platforms}
              />
              <IconButton href="/settings">
                <SettingsIcon />
              </IconButton>
            </>
          )}
          {!showSearch && (
            <>
              <Typography variant="h6" noWrap className={classes.loginTitle}>
                mentions<span className={classes.titlePart}>crawler.</span>
              </Typography>
              <Typography className={classes.linkTitle}>
                {loginRegisterMessage}
              </Typography>
              <Button
                variant="outlined"
                href={userRedirect}
                className={classes.loginRegisterButton}
              >
                <Typography variant="button">
                  {loginRegisterName}
                </Typography>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
