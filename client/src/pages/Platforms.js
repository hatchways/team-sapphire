import React from "react";

import { Switch, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TwitterIcon from "@material-ui/icons/Twitter";
import InfoIcon from "@material-ui/icons/Info";
import RedditIcon from "@material-ui/icons/Reddit";
import FiberNewOutlinedIcon from '@material-ui/icons/FiberNewOutlined';

const useStyles = makeStyles(theme => ({
  platformContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "80px",
    marginTop: "10px",
    marginLeft: "25px",
    marginRight: "25px"
  },
  dividerContainer: {
    width: "97.5%"
  },
  iconContainer: {
    float: "left",
    marginLeft: "20px",
    marginRight: "20px",
    transform: "scale(2, 2)"
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
  const icons = [];
  for(let i = 0; i < 7; i++){
    if(i===0){
      icons.push(<RedditIcon color='primary' className={classes.iconContainer}>info</RedditIcon>)
    } else if(i===1){
      icons.push(<TwitterIcon color='primary' className={classes.iconContainer}>info</TwitterIcon>)
    } else if(i===2){
      icons.push(<FiberNewOutlinedIcon color='primary' className={classes.iconContainer}>info</FiberNewOutlinedIcon>)
    } else{
      icons.push(<InfoIcon color='disabled' className={classes.iconContainer}>info</InfoIcon>)
    }
  }
  
  const platforms = Object.keys(props.platforms).map((platform, i) => {
    return (
      <div key={i}>
        <Typography
          className={classes.platformContainer}
          align="justify"
        >
          <Typography>
            {icons[i]}
            {platform}
          </Typography>
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
            disabled={(platform !== "Twitter" && platform !== "Reddit" && platform !=="The New York Times") ? true : false}
          />
        </Typography>
        <Divider className={classes.dividerContainer} />
      </div>
    );
  });
  return <div>{platforms}</div>;
}

export default Platforms;
