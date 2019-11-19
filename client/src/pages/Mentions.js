import React, { useState, useEffect } from "react";

import { Card, CardContent, Typography, Switch } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mentionsContainer: {
    width: '75%',
    margin: 'auto'
  },
  sortToggleContainer: {
    float: 'right'
  }
}));

function Mentions(props) {
  const classes = useStyles();
  const mentions = props.mentions.map((mention, i) => {
    return <Card>
             <CardContent>
               <Typography>
                 {mention.title}
               </Typography>
               <Typography>
                 {mention.platform}
               </Typography>
               <Typography>
                 {mention.desc}
               </Typography>
             </CardContent>
           </Card>
  })
  return (
    <div className={classes.mentionsContainer}>
      <Typography variant="h4">
        My mentions
        <Switch className={classes.sortToggleContainer}/>
      </Typography>
      {mentions}
    </div>
  );
}

export default Mentions;
