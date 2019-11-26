import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  bodyContainer: {
    backgroundColor: "#fafbff",
    height: "100vh",
    padding: "5vh"
  },
  companyContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  companyTitle: {
    fontSize: "25px"
  },
  userEmailInput: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "5vh"
  },
  emailTitle: {
    marginleft: "1vh",
    fontSize: "25px"
  },
  companyNameInput: {
    border: "none",
    width: "600px",
    outline: "none"
  },
  companyNamesContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "2vh",
    width: "600px"
  },
  buttonAdornment: {
    backgroundColor: "#6583f2 ",
    borderRadius: "25px",
    color: "white"
  },
  companyInputForm: {
    borderRadius: "25px",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-between",
    margin: "1vh",
    borderStyle: "inset",
    padding: "4px",
    width: "600px"
  },
  listOfCompanies: {
    borderRadius: "25px",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-between",
    margin: "1vh",
    borderStyle: "inset",
    padding: "4px",
    width: "600px",
    marginLeft: "266px"
  },
  error: {
    color: "red",
    display: "flex",
    justifyContent: "center"
  },
  listOfInputs: {
    display: "flex",
    flexDirection: "column"
  },
  companyEmailInput: {
    border: "inset",
    width: "600px",
    outline: "none",
    borderStyle: "inset",
    borderRadius: "25px"
  }
}));
const SettingsBody = () => {
  const classes = useStyles();
  const history = useHistory();
  const [companyNameSaveError, setCompanyNameSaveError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [companyNames, setCompanyNames] = useState([]);
  const [companyNameInput, setCompanyNameInput] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const checkCompanyNameUnique = name => {
    let found = false;
    for (let companyName of companyNames) {
      if (companyName.name === name) {
        found = true;
        break;
      }
    }
    return found;
  };

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
    if (checkCompanyNameUnique(event.target.companyName.value)) {
      setCompanyNameError("Company Name already exists");
    } else {
      setCompanyNames([
        ...companyNames,
        { name: event.target.companyName.value }
      ]);
    }

    setCompanyNameInput("");
  };

  const onAddHandler = () => {
    setCompanyNameError("");
    setCompanyNameSaveError("");
  };
  const onRemoveHandler = name => {
    setCompanyNames(companyNames.filter(item => item.name !== name));
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
              placeholder="Add Company name"
              title="Add a tag"
              value={companyNameInput}
              id="companyName"
              onChange={event => setCompanyNameInput(event.target.value)}
              className={classes.companyNameInput}
            />

            <button onClick={onAddHandler} className={classes.buttonAdornment}>
              Add
            </button>
          </form>
        </div>
      </div>
      {companyNames.length > 0 &&
        companyNames.map((company, index) => {
          return (
            <div className={classes.listOfCompanies}>
              <span className="" key={index}>
                {company.name}
              </span>
              <button
                onClick={() => onRemoveHandler(company.name)}
                className={classes.buttonAdornment}
              >
                Remove
              </button>
            </div>
          );
        })}
      <p className={classes.error}>{companyNameError}</p>

      <div className={classes.userEmailInput}>
        {" "}
        <b className={classes.emailTitle}>Weekly Report </b>
        <input
          name="company-email"
          label=""
          type="text"
          id="company-email"
          value={userEmail}
          onChange={event => setUserEmail(event.target.value)}
          className={classes.companyEmailInput}
        />
      </div>

      <p className={classes.error}>{companyNameSaveError}</p>
      <button onClick={onClickHandler} className={classes.buttonAdornment}>
        Save
      </button>
    </div>
  );
};

export default SettingsBody;
