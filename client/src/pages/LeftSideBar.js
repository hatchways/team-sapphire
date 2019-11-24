import React from "react";

import {
  Switch,
  Icon,
  Typography,
  Divider,
  IconButton,
  Link
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  dividerContainer: {
    marginTop: "20px",
    width: "97.5%"
  }
}));

const LeftSideBar = () => {
  const classes = useStyles();
  return (
    <div>
      <div>
        Settings
        <IconButton className={classes.settings}>
          <SettingsIcon />
        </IconButton>
      </div>
      <div>
        <Link href="/login" variant="body2">
          {"Company"}
        </Link>
        <Link href="/login" variant="body2">
          {"Security"}
        </Link>
        <Link href="/login" variant="body2">
          {"Log out"}
        </Link>
      </div>
    </div>
  );
};

export default LeftSideBar;
