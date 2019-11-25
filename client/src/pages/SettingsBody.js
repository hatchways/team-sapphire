import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container
} from "@material-ui/core";
import color from "@material-ui/core/colors/grey";

const useStyles = makeStyles(theme => ({
  bodyContainer: {
    backgroundColor: "#fafbff",
    height: "100vh"
  },
  companyNameInput: {
    [`& fieldset`]: {
      borderRadius: "25px",
      backgroundColor: "white"
    }
  },
  buttonAdornment: {
    backgroundColor: "#6583f2 ",
    borderRadius: "25px",
    color: "white"
  }
}));
const SettingsBody = () => {
  const classes = useStyles();
  const history = useHistory();

  const onClickHandler = event => {
    event.preventDefault();
    console.log(event.target);

    history.push("/dashboard");
  };

  return (
    <div className={classes.bodyContainer}>
      <div>
        {" "}
        <b>Your company</b>
      </div>
      <TextField
        variant="outlined"
        margin="normal"
        required
        name="company-name"
        label=""
        type="text"
        id="company-name"
        className={classes.companyNameInput}
        InputProps={{
          endAdornment: <Button className={classes.buttonAdornment}>Add</Button>
        }}
      />
      <div>
        {" "}
        <b>Weekly Report </b>
      </div>
      <TextField
        variant="outlined"
        margin="normal"
        required
        name="company-email"
        label=""
        type="text"
        id="company-email"
        className={classes.companyNameInput}
      />
      <Button onClick={onClickHandler} className={classes.buttonAdornment}>
        Save
      </Button>
    </div>
  );
};

export default SettingsBody;
