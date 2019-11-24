import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import LoginRegisterNavbar from "./LoginRegisterNavbar";

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
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: "25px"
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

const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const [registerError, setRegisterError] = useState("");

  const onSubmitHandler = event => {
    setRegisterError("");
    event.preventDefault();

    axios
      .post("http://localhost:4000/register", {
        username: event.target.email.value,
        password: event.target.password.value
      })
      .then(res => {
        if (res.data.success) {
          history.push("/settings");
        }
      })
      .catch(() => setRegisterError("Sorry, this email already exists."));
  };

  const onClickHandler = () => {
    setRegisterError("");
  };

  return (
    <div>
      <LoginRegisterNavbar showRegister={true} />

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h4" variant="h4">
            Let's Get Started!
          </Typography>
          <Typography component="h1">Create an account</Typography>
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
              name="company-name"
              label="Company Name"
              type="company-name"
              id="company-name"
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
export default Register;
