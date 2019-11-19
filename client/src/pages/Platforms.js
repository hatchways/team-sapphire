import React from "react";

import { Switch, Icon, Typography, Divider } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  platformContainer: {
    height: '55px'
  },
  dividerContainer: {
    marginTop: '7.5px',
    width: '97.5%'
  },
  iconContainer: {
    float: 'left',
    marginRight: '20px'
  },
  toggleContainer: {
    float: 'right'
  }
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
