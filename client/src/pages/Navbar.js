import React from "react";

import { AppBar, Toolbar, InputBase, Paper, Typography, IconButton } from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  title: {
    width: '160px'
  },
  titlePart: {
    color: '#30336b'
  },
  search: {
    width: '50%',
    height: '90%',
    borderRadius: '50px',
    margin: 'auto'
  },
  input: {
    width: 'calc(100% - 58px)',
    marginLeft: '10px'
  },
  settings: {
    float: 'right'
  }
}));

function Navbar(props) {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" noWrap className={classes.title}>
          mentions<span className={classes.titlePart}>crawler</span>
        </Typography>
        {props.loggedIn ?
          <>
            <Paper component="form" className={classes.search}>
              <InputBase
                placeholder="Search Company Name..."
                className={classes.input}
              />
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            <IconButton className={classes.settings}>
              <SettingsIcon />
            </IconButton>
          </>
        :
          <>
            <Paper component="form" className={classes.search}>
              <InputBase
                placeholder="Search Company Name..."
                className={classes.input}
              />
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            <IconButton className={classes.settings}>
              <SettingsIcon />
            </IconButton>
          </>}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
