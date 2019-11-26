import React, { useState } from "react";
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
    height: "100vh",
    padding: "5vh"
  },
  companyNameInput: {
    borderRadius: "25px"
    // backgroundColor: "white"
  },
  companyNamesContainer: {
    display: "flex",
    flexDirection: "column"
  },
  buttonAdornment: {
    backgroundColor: "#6583f2 ",
    borderRadius: "25px",
    color: "white"
  },
  listOfCompanies: {
    borderRadius: "25px"
  },
  error: {
    color: "red",
    display: "flex",
    justifyContent: "center"
  }
}));
const SettingsBody = () => {
  const classes = useStyles();
  const history = useHistory();
  const [companyNameSaveError, setCompanyNameSaveError] = useState("");
  const [companyNames, setCompanyNames] = useState([]);
  const [companyNameInput, setCompanyNameInput] = useState("");

  const onClickHandler = event => {
    event.preventDefault();
    if (companyNames.length > 0) {
      history.push("/dashboard");
    } else {
      setCompanyNameSaveError("Add at least one company name");
    }
  };
  const onSubmitHandler = event => {
    event.preventDefault();
    event.persist();

    setCompanyNames([...companyNames, event.target.fruitName.value]);
    setCompanyNameInput("");
  };

  const onAddHandler = () => {
    setCompanyNameSaveError("");
  };

  return (
    <div className={classes.bodyContainer}>
      <div>
        {" "}
        <b>Your company</b>
      </div>
      <div>
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            placeholder="Add Company name"
            title="Add a tag"
            value={companyNameInput}
            id="fruitName"
            onChange={event => setCompanyNameInput(event.target.value)}
            className={classes.companyNameInput}
          />

          <button onClick={onAddHandler} className={classes.buttonAdornment}>
            Add
          </button>
        </form>
        {/* <TextField
          variant="outlined"
          margin="normal"
          // required
          name="company-name"
          value={companyNameInput}
          label=""
          type="text"
          id="company-name"
          className={classes.companyNameInput}
          onChange={event => setCompanyNameInput(event.target.value)}
          InputProps={{
            endAdornment: (
              <Button onAdd={onAddHandler} className={classes.buttonAdornment}>
                Add
              </Button>
            )
          }}
        /> */}
        <div className={classes.companyNamesContainer}>
          {companyNames.length > 0 &&
            companyNames.map((companyName, index) => (
              <span className={classes.listOfCompanies} key={index}>
                {" "}
                {companyName}
              </span>
            ))}
        </div>
      </div>
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
      <p className={classes.error}>{companyNameSaveError}</p>
      <Button onClick={onClickHandler} className={classes.buttonAdornment}>
        Save
      </Button>
    </div>
  );
};

export default SettingsBody;
