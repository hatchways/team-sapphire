import React, { useState, useEffect } from "react";
import axios from "axios";
import { withSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  companyNameInput: {
    border: "none",
    width: "500px",
    outline: "none",
    height: "25px",
    fontWeight: "bold",
    marginLeft: "15px"
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
    width: "500px",
    alignItems: "center",
    marginLeft: "131px"
  },
  error: {
    color: "red",
    display: "flex",
    justifyContent: "center"
  }
}));

const CompanyNameTextfield = ({
  index,
  defaultCompanyName,
  setCompanyNames,
  companyNames,
  enqueueSnackbar,
  setCompanyNameError,
  setCompanyNameSaveError
}) => {
  const classes = useStyles();

  const [companyNameInput, setCompanyNameInput] = useState(defaultCompanyName);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setCompanyNameInput(defaultCompanyName);
  }, [defaultCompanyName]);

  const onRemoveHandler = (name, event) => {
    event.preventDefault();
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
    if (!isEdit) setIsEdit(true);

    setCompanyNameInput(event.target.value);
  };

  const onSubmitHandler = event => {
    setCompanyNameError("");
    setCompanyNameSaveError("");

    event.preventDefault();

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
          axios.delete(
            `/settings/${localStorage.getItem(
              "email"
            )}/company/${defaultCompanyName}`
          );
        })
        .then(() => {
          setCompanyNameInput(event.target.companyName.value);

          let updatedCompanyNames = [...companyNames];
          updatedCompanyNames.splice(index, 1, event.target.companyName.value);

          setCompanyNames(updatedCompanyNames);
        })
        .then(() => {
          enqueueSnackbar("Company has been edited and added", {
            variant: "success"
          });
        })
        .catch(() =>
          enqueueSnackbar("Company was not edited and added", {
            variant: "error"
          })
        );

      setIsEdit(false);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className={classes.companyInputForm}>
        <input
          type="text"
          id="companyName"
          value={companyNameInput}
          onChange={onChangeHandler}
          className={classes.companyNameInput}
        ></input>
        {isEdit ? (
          <button type="submit" className={classes.buttonAdornment}>
            <b>SAVE</b>
          </button>
        ) : (
          <button
            onClick={event => onRemoveHandler(companyNameInput, event)}
            className={classes.buttonAdornment}
          >
            <b>REMOVE</b>
          </button>
        )}
      </form>
    </div>
  );
};

export default withSnackbar(CompanyNameTextfield);
