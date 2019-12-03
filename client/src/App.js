import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import SingleMention from "./pages/SingleMention";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/mentions/:id" component={SingleMention} />
        </BrowserRouter>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
}
export default App;
