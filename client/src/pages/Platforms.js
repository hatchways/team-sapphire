import React from "react";

import { Switch, Icon, Typography, Divider } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  platformContainer: {
    height: '55px',
    marginTop: '10px',
    marginLeft: '10px'
  },
  dividerContainer: {
    marginTop: '20px',
    width: '97.5%'
  },
  iconContainer: {
    float: 'left',
    marginRight: '20px',
    transform: 'scale(1.5, 1.5)'
  },
  toggleContainer: {
    float: 'right'
  },
  root: {
    width: 42,
    height: 20,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(22px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#30336b',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#30336b',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 18,
    height: 18,
  },
  track: {
    borderRadius: 20 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}));

function Platforms(props) {
  const classes = useStyles();
  const platforms = props.platforms.map((platform, i) => {
    return <Typography className={classes.platformContainer}>
            <div>
              <Icon className={classes.iconContainer}>
                info
              </Icon>
              {platform.name}
              <Switch
                checked={platform.inUse}
                onChange={() => props.handleChange(i)}
                color="primary"
                className={classes.toggleContainer}
                classes={{
                  root: classes.root,
                  switchBase: classes.switchBase,
                  thumb: classes.thumb,
                  track: classes.track,
                  checked: classes.checked,
                }}
              />
            </div>
            <Divider className={classes.dividerContainer}/>
           </Typography>
  })
  return (
    <div>
      {platforms}
    </div>
  );
}

export default Platforms;
