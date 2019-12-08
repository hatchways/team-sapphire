import React from "react";

import { Switch, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles(theme => ({
  platformContainer: {
    height: "80px",
    marginTop: "10px",
    marginLeft: "10px",
    marginRight: "10px"
  },
  dividerContainer: {
    width: "97.5%"
  },
  iconContainer: {
    float: "left",
    marginLeft: "20px",
    marginRight: "20px",
    transform: "scale(1.5, 1.5)"
  },
  toggleContainer: {
    float: "right",
    paddingRight: "50px",
    transform: "scale(1.2, 1.2)"
  },
  root: {
    width: 42,
    height: 20,
    padding: 0,
    margin: theme.spacing(1)
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(22px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#0099e6",
        opacity: 1,
        border: "none"
      }
    },
    "&$focusVisible $thumb": {
      color: "#0099e6",
      border: "1px solid #fff"
    }
  },
  thumb: {
    width: 18,
    height: 18
  },
  track: {
    borderRadius: 20 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"])
  },
  checked: {},
  focusVisible: {}
}));

function Platforms(props) {
  const classes = useStyles();
  const platforms = Object.keys(props.platforms).map((platform, i) => {
    return (
      <div key={i}>
        <Typography
          className={classes.platformContainer}
          align="justify"
        >
          <TwitterIcon className={classes.iconContainer}>info</TwitterIcon>
          {platform}
          <Switch
            checked={props.platforms[platform]}
            onChange={() => props.handleChange(platform)}
            color="primary"
            className={classes.toggleContainer}
            classes={{
              root: classes.root,
              switchBase: classes.switchBase,
              thumb: classes.thumb,
              track: classes.track,
              checked: classes.checked
            }}
          />
        </Typography>
        <Divider className={classes.dividerContainer} />
      </div>
    );
  });
  return <div>{platforms}</div>;
}

export default Platforms;
