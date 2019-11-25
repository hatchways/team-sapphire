import React from "react";
import { useHistory } from "react-router-dom";

import {
  Switch,
  Icon,
  Typography,
  Tab,
  Tabs,
  Grid,
  IconButton,
  Link
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  dividerContainer: {
    marginTop: "20px",
    width: "97.5%"
  },
  settingsTitle: {
    fontSize: "20px"
  },
  settings: {
    color: "#6583f2"
  },
  titleContainer: {
    paddingLeft: "30px",
    // justifyContent: "center",
    alignItems: "center",
    paddingTop: "40px"
  },
  companyTitle: {
    paddingLeft: "30px",
    paddingTop: "40px"
  },
  sideBarContainer: {
    display: "flex",
    flexDirection: "column"
    // alignItems: "flex-start"
  },
  sideBarContents: {
    fontWeight: "bold"
  }
}));

const LeftSideBar = () => {
  const classes = useStyles();
  const history = useHistory();

  const onClickHandler = event => {
    event.preventDefault();
    history.push("/login");
  };
  return (
    <div>
      <Grid container className={classes.titleContainer}>
        <b className={classes.settingsTitle}> Settings</b>
        <IconButton className={classes.settings}>
          <SettingsIcon />
        </IconButton>
      </Grid>

      <Grid className={classes.sideBarContainer}>
        <Tab label="Company" className={classes.sideBarContents} />

        <Tab
          label="Logout"
          className={classes.sideBarContents}
          onClick={onClickHandler}
        />
      </Grid>
    </div>
  );
};

export default LeftSideBar;
