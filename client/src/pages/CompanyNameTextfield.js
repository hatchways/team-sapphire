import React, { useState } from "react";
import axios from "axios";
import { withSnackbar } from "notistack";
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
    fontSize: "20px"
  },
  userEmailInput: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "5vh"
  },
  emailTitle: {
    marginleft: "1vh",
    fontSize: "20px"
  },
  companyNameInput: {
    border: "none",
    width: "600px",
    outline: "none",
    height: "25px"
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
    padding: "10px",
    width: "600px",
    alignItems: "center"
  },
  listOfCompanies: {
    borderRadius: "25px",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-between",
    margin: "1vh",
    border: "1px solid #eeeeef",
    padding: " 10px ",
    width: "600px",
    marginLeft: "258px",
    alignItems: "center"
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
    width: "600px",
    outline: "none",
    backgroundColor: "white",
    height: "25px",
    border: "1px solid #eeeeef",
    borderRadius: "25px",
    alignItems: "center",
    padding: "10px"
  },
  saveButton: {
    backgroundColor: "#6583f2 ",
    borderRadius: "25px",
    color: "white",
    fontSize: "15px",
    marginLeft: "5vh",
    width: "90px",
    height: "35px"
  }
}));

const CompanyNameTextfield = ({
  defaultCompanyName,
  setCompanyNames,
  companyNames,
  setCompanyNameError,
  enqueueSnackbar,
  setCompanyNameSaveError
}) => {
  const classes = useStyles();

  const [companyName, setCompanyName] = useState(defaultCompanyName);
  const onRemoveHandler = name => {
    axios
      .delete(`/settings/${localStorage.getItem("email")}/company/${name}`)
      .then(() => {
        enqueueSnackbar("Company has been removed", { variant: "success" });
        setCompanyNames(companyNames.filter(item => item !== name));
      })
      .catch(() =>
        enqueueSnackbar("Company was not removed", { variant: "error" })
      );
    setCompanyNameError("");
    setCompanyNameSaveError("");
  };

  const onChangeHandler = event => {
    event.preventDefault();

    setCompanyName(event.target.value);
  };

  return (
    <div className={classes.listOfCompanies}>
      <input
        type="text"
        value={companyName}
        onChange={onChangeHandler}
        className={classes.companyNameInput}
      ></input>
      <button
        onClick={() => onRemoveHandler(companyName)}
        className={classes.buttonAdornment}
      >
        <b> REMOVE</b>
      </button>
    </div>
  );
};

export default withSnackbar(CompanyNameTextfield);
