import React, { useState, useEffect } from "react";

import { Card, CardContent, CardMedia, Typography, Switch } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mentionsContainer: {
    width: '75%',
    margin: 'auto'
  },
  sortToggleContainer: {
    float: 'right'
  },
  cardContainer: {
    marginBottom: '10px',
    display: 'flex'
  },
  cardImage: {
    width: '30%'
  },
  header: {
    marginBottom: '20px'
  }
}));

function Mentions(props) {
  const classes = useStyles();
  const mentions = props.mentions.map((mention, i) => {
    return <Card className={classes.cardContainer}>
             <CardMedia
               component="img"
               alt="Stock image"
               image="https://media.istockphoto.com/photos/business-people-using-pentabletnotebook-are-planning-a-marketing-plan-picture-id881542122?k=6&m=881542122&s=612x612&w=0&h=Sc70smgI-QSn1gLFO2UdAZIb8F9LKptDH8AujitIXBk="
               title="Stock Business Image"
               className={classes.cardImage}
             />
             <div>
               <CardContent>
                 <Typography variant="h5" component="h2">
                   {mention.title}
                 </Typography>
                 <Typography>
                   {mention.platform}
                 </Typography>
                 <Typography>
                   {mention.desc}
                 </Typography>
               </CardContent>
             </div>

           </Card>
  })
  return (
    <div className={classes.mentionsContainer}>
      <Typography variant="h4" className={classes.header}>
        My mentions
        <Switch className={classes.sortToggleContainer}/>
      </Typography>
      {mentions}
    </div>
  );
}

export default Mentions;
