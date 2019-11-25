import React from "react";

import {
  Switch,
  Icon,
  Typography,
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
    color: "#3f51b5"
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "60px"
  }
}));

const LeftSideBar = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.titleContainer}>
        <b className={classes.settingsTitle}> Settings</b>
        <IconButton className={classes.settings}>
          <SettingsIcon />
        </IconButton>
      </Grid>
      <div>
        <Link href="/login" variant="body2">
          {"Company"}
        </Link>

        <Link href="/login" variant="body2">
          {"Log out"}
        </Link>
      </div>
    </div>
  );
};

export default LeftSideBar;
