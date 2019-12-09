import React from "react";

import { useHistory } from "react-router-dom";
import axios from "axios";
import { withSnackbar } from "notistack";

import { Grid, IconButton } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  dividerContainer: {
    marginTop: "20px",
    width: "97.5%"
  },
  settingsTitle: {
    fontSize: "20px",
    color: "#141414"
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
    flexDirection: "column",
    marginLeft: "10px"
  },
  sideBarContentsCompany: {
    fontWeight: "bold",
    borderLeft: "5px solid #6583f2",
    padding: "6px",
    color: "#6583f2",
    marginLeft: "8px",
    marginBottom: "30px",
    marginTop: "30px",
    "&:hover": {
      cursor: "pointer"
    }
  },
  sideBarContents: {
    fontWeight: "bold",
    borderLeft: "5px solid white",
    padding: "6px",
    marginLeft: "8px",
    color: "#141414",
    "&:hover": {
      cursor: "pointer"
    }
  }
}));

const LeftSideBar = ({ enqueueSnackbar }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      let response = await axios.post("http://localhost:4000/logout");
      if (response.data.success) {
        axios.post(`/queue/${localStorage.getItem("email")}`).then(() => {
          localStorage.clear();
          history.push("/login");
        });
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
        <div label="Company" className={classes.sideBarContentsCompany}>
          Company
        </div>

        <div
          label="Logout"
          className={classes.sideBarContents}
          onClick={handleLogout}
        >
          Logout
        </div>
      </Grid>
    </div>
  );
};

export default withSnackbar(LeftSideBar);
