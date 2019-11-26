import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

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
  const [userEmail, setUserEmail] = useState("");

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

    setCompanyNames([
      ...companyNames,
      { name: event.target.companyName.value }
    ]);
    setCompanyNameInput("");
  };

  const onAddHandler = () => {
    setCompanyNameSaveError("");
  };
  const onRemoveHandler = name => {
    setCompanyNames(companyNames.filter(item => item.name !== name));
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
            id="companyName"
            onChange={event => setCompanyNameInput(event.target.value)}
            className={classes.companyNameInput}
          />

          <button onClick={onAddHandler} className={classes.buttonAdornment}>
            Add
          </button>
        </form>

        <div className={classes.companyNamesContainer}>
          {companyNames.length > 0 &&
            companyNames.map((company, index) => {
              return (
                <div>
                  <span className={classes.listOfCompanies} key={index}>
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
        </div>
      </div>
      <div>
        {" "}
        <b>Weekly Report </b>
      </div>
      <input
        name="company-email"
        label=""
        type="text"
        id="company-email"
        value={userEmail}
        onChange={event => setUserEmail(event.target.value)}
        className={classes.companyNameInput}
      />
      <p className={classes.error}>{companyNameSaveError}</p>
      <button onClick={onClickHandler} className={classes.buttonAdornment}>
        Save
      </button>
    </div>
  );
};

export default SettingsBody;
