import React from "react";

import { useHistory } from "react-router-dom";
import axios from "axios";
import { withSnackbar } from "notistack";

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
  },
  sideBarContents: {
    fontWeight: "bold"
  }
}));

const LeftSideBar = ({ enqueueSnackbar }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      let response = await axios.post("http://localhost:4000/logout");
      if (response.data.success) {
        localStorage.clear();
        history.push("/login");
      }
    } catch (err) {
      enqueueSnackbar("Something went wrong, Please try again", {
        variant: "error"
      });
    }
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
          onClick={handleLogout}
        />
      </Grid>
    </div>
  );
};

export default withSnackbar(LeftSideBar);
