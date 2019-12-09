import React, { useState } from "react";
import axios from "axios";
import { withSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";

import {
  Button,
  CssBaseline,
  TextField,
  Typography,
  makeStyles,
  Container
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: "#fafbff"
    }
  },
  formContainer: {
    backgroundColor: "white",
    padding: "5%",
    marginTop: "5%"
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  subHeader: {
    color: "#b8c8f9"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: "25px",
    backgroundColor: theme.appBlue
  },
  formInput: {
    [`& fieldset`]: {
      borderRadius: "25px"
    }
  },
  error: {
    color: "red",
    display: "flex",
    justifyContent: "center"
  }
}));

const Register = ({ enqueueSnackbar }) => {
  const classes = useStyles();
  const history = useHistory();
  const [registerError, setRegisterError] = useState("");

  const onSubmitHandler = event => {
    setRegisterError("");
    event.preventDefault();

    axios
      .post("/register", {
        username: event.target.email.value,
        password: event.target.password.value,
        company: event.target.company.value
      })
      .then(res => {
        if (res.data.success) {
          localStorage.setItem("email", res.data.user.username);

          history.push("/settings");
        }
      })

      .catch(err => {
        if (err.response.status === 500) {
          enqueueSnackbar("Something went wrong, Please try again", {
            variant: "error"
          });
        } else {
          setRegisterError("Sorry, this email already exists.");
        }
      });
  };

  const onClickHandler = () => {
    setRegisterError("");
  };

  return (
    <div>
      <Navbar />
      <Container
        component="main"
        maxWidth="xs"
        className={classes.formContainer}
      >
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h4" variant="h4" className={classes.title}>
            Let's Get Started!
          </Typography>
          <Typography component="h1" className={classes.subHeader}>
            Create an account
          </Typography>
          <form className={classes.form} onSubmit={onSubmitHandler}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="email"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              className={classes.formInput}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="company"
              label="Company Name"
              type="company"
              id="company"
              autoComplete="current-company-name"
              className={classes.formInput}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              className={classes.formInput}
              inputProps={{ minLength: 6 }}
            />
            <p className={classes.error}>{registerError}</p>

            <Button
              type="submit"
              onClick={onClickHandler}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};
export default withSnackbar(Register);
