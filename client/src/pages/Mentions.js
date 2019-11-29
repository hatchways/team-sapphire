import React from "react";

import { Card, CardContent, CardMedia, Typography, Paper, Tabs, Tab, Link } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mentionsContainer: {
    width: '75%',
    margin: 'auto',
    marginTop: '10px'
  },
  sortToggleContainer: {
    float: 'right',
    borderRadius: '50px',
    color: '#30336b'
  },
  cardContainer: {
    marginBottom: '10px',
    display: 'flex',
    height: '18vh',
    maxHeight: '18vh'
  },
  cardImage: {
    width: '30%'
  },
  header: {
    marginBottom: '20px',
    height: (window.innerWidth > 1024) ? '50px' : '100px'
  }
}));

function Mentions(props) {
  const classes = useStyles();
  const mentions = props.mentions.map((mention, i) => {
    return <Card className={classes.cardContainer} key={i}>
             <CardMedia
               component="img"
               alt="image"
               image={mention.image}
               title="Image"
               className={classes.cardImage}
             />
             <div>
               <CardContent>
                 <Typography variant="h5" component="h2">
                   {mention.title}
                 </Typography>
                 <Typography>
                   <Link href={mention.link} rel="noopener">
                    {mention.platform}
                  </Link>
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
        <Paper className={classes.sortToggleContainer}>
          <Tabs
            value={props.sort}
            onChange={props.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            className={classes.sortToggleContainer}
          >
            <Tab label="Most recent" className={classes.sortToggleContainer}/>
            <Tab label="Most popular" className={classes.sortToggleContainer}/>
          </Tabs>
        </Paper>
      </Typography>
      {mentions}
    </div>
  );
}

export default Mentions;
