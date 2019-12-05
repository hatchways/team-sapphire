import React, { useState } from "react";
import axios from "axios";
import { withSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

import Navbar from "./Navbar";

import {
  Button,
  CssBaseline,
  TextField,
  Box,
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

const Login = ({ enqueueSnackbar }) => {
  const classes = useStyles();
  const history = useHistory();
  const [loginError, setLoginError] = useState("");

  const onSubmitHandler = event => {
    setLoginError("");
    event.preventDefault();

    axios
      .post("/login", {
        username: event.target.email.value,
        password: event.target.password.value
      })
      .then(res => {
        if (res.data.success) {
          localStorage.setItem("email", res.data.user.username);
          history.push("/dashboard");
        }
      })
      .catch(err => {
        if (err.response.status === 500) {
          enqueueSnackbar("Something went wrong, Please try again", {
            variant: "error"
          });
        } else {
          setLoginError("Please check your email and password");
        }
      });
  };

  const onClickHandler = () => {
    setLoginError("");
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
          <Typography component="h5" variant="h5" className={classes.title}>
            Welcome Back!
          </Typography>
          <Typography component="h1" className={classes.subHeader}>
            Login to your account
          </Typography>
          <form className={classes.form} onSubmit={onSubmitHandler}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
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
              InputProps={{ endAdornment: <Button>Forgot?</Button> }}
            />
            <p className={classes.error}>{loginError}</p>

            <Button
              type="submit"
              onClick={onClickHandler}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    </div>
  );
};

export default withSnackbar(Login);
