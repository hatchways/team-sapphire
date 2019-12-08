import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { withSnackbar } from "notistack";

import { makeStyles } from "@material-ui/core/styles";

import CompanyNameTextfield from "./CompanyNameTextfield";

const useStyles = makeStyles(theme => ({
  bodyContainer: {
    height: "100vh",
    width: "50vw",
    paddingTop: "30px",
    paddingLeft: "100px"
  },
  companyContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  companyTitle: {
    marginRight: "20px",
    fontSize: "15px"
  },
  userEmailInput: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "5vh",
    alignItems: "center"
  },
  emailTitle: {
    marginRight: "4vh",
    fontSize: "15px"
  },
  companyNameInput: {
    border: "none",
    width: "500px",
    outline: "none",
    height: "25px",
    marginLeft: "10px",
    fontSize: "small"
  },
  companyNamesContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "2vh",
    width: "500px"
  },
  buttonAdornment: {
    backgroundColor: "#6583f2 ",
    borderRadius: "25px",
    color: "white",
    width: "70px",
    height: "30px"
  },
  companyInputForm: {
    borderRadius: "25px",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-between",
    margin: "1vh",
    border: "1px solid #eeeeef",
    padding: "5px",
    width: "38vw",
    alignItems: "center"
  },

  error: {
    color: "red",
    display: "flex",
    justifyContent: "center"
  },

  companyEmailInput: {
    width: "38vw",
    outline: "none",
    backgroundColor: "white",
    height: "25px",
    border: "1px solid #eeeeef",
    borderRadius: "25px",
    alignItems: "center",
    padding: "5px",
    fontSize: "small",
    fontWeight: "bold"
  },
  dashboardButton: {
    backgroundColor: "#6583f2 ",
    borderRadius: "25px",
    color: "white",
    fontSize: "15px",
    marginTop: "40px",
    width: "110px",
    height: "35px"
  },
  userEmail: {
    padding: "3px",
    marginLeft: "8px"
  }
}));

const SettingsBody = ({ enqueueSnackbar, companyNames, setCompanyNames }) => {
  const classes = useStyles();
  const history = useHistory();
  const [companyNameSaveError, setCompanyNameSaveError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");

  const [companyNameInput, setCompanyNameInput] = useState("");

  const onClickHandler = event => {
    event.preventDefault();
    if (companyNames.length > 0) {
      history.push("/dashboard");
      axios.put(`/settings/${localStorage.getItem("email")}`);
    } else {
      setCompanyNameSaveError("Add at least one company name");
    }
  };

  const onSubmitHandler = event => {
    event.preventDefault();

    setCompanyNameError("");
    setCompanyNameSaveError("");

    event.persist();

    if (companyNames.includes(event.target.companyName.value)) {
      setCompanyNameError("Company name already exists");
    } else if (event.target.companyName.value === "") {
      setCompanyNameError("Company name cannot be blank");
    } else {
      axios
        .put(
          `/settings/${localStorage.getItem("email")}/company/${
            event.target.companyName.value
          }`
        )
        .then(() => {
          setCompanyNames([...companyNames, event.target.companyName.value]);
          setCompanyNameInput("");
          enqueueSnackbar("Company has been added", { variant: "success" });
        })
        .catch(() =>
          enqueueSnackbar("Company was not added", { variant: "error" })
        );
    }
  };

  return (
    <div className={classes.bodyContainer}>
      <div className={classes.companyContainer}>
        <div className={classes.companyTitle}>
          <b>Your company</b>
        </div>

        <div className={classes.companyNamesContainer}>
          <form onSubmit={onSubmitHandler} className={classes.companyInputForm}>
            <input
              type="text"
              placeholder="Company name"
              title="Add a tag"
              value={companyNameInput}
              id="companyName"
              onChange={event => setCompanyNameInput(event.target.value)}
              className={classes.companyNameInput}
            />

            <button type="submit" className={classes.buttonAdornment}>
              <b>ADD</b>
            </button>
          </form>
        </div>
      </div>
      {companyNames.length > 0 &&
        companyNames.map((company, index) => {
          return (
            <CompanyNameTextfield
              key={index}
              index={index}
              defaultCompanyName={company}
              companyNames={companyNames}
              setCompanyNames={setCompanyNames}
              companyNameError={companyNameError}
              setCompanyNameError={setCompanyNameError}
              setCompanyNameSaveError={setCompanyNameSaveError}
            />
          );
        })}
      <p className={classes.error}>{companyNameError}</p>

      <div className={classes.userEmailInput}>
        <b className={classes.emailTitle}>Weekly report </b>
        <div className={classes.companyEmailInput}>
          <div className={classes.userEmail}>
            {localStorage.getItem("email")}
          </div>
        </div>
      </div>

      <p className={classes.error}>{companyNameSaveError}</p>
      <button onClick={onClickHandler} className={classes.dashboardButton}>
        <b>Dashboard</b>
      </button>
    </div>
  );
};

export default withSnackbar(SettingsBody);
