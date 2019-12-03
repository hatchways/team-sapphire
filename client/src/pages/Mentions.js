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
    let title = mention.title;
    let desc = mention.desc;
    const titleIndex = title.search(mention.company) > -1 ? title.search(mention.company) : title.search(mention.company.toLowerCase());
    const descIndex = desc.search(mention.company) > -1 ? desc.search(mention.company) : desc.search(mention.company.toLowerCase());
    if (desc.length > 200 && (descIndex + mention.company.length) >= 200) {
      desc = "..." + desc.substring(descIndex - 100, descIndex + 100) + "...";
    } else if (desc.length > 200 && (descIndex + mention.company.length) < 200) {
      desc = desc.substring(0, 200) + "...";
    }
    if (title.length > 40 && (titleIndex + mention.company.length) >= 40) {
      title = "..." + title.substring(titleIndex - 20, titleIndex + 20) + "...";
    } else if (title.length > 40 && (titleIndex + mention.company.length) < 40) {
      title = title.substring(0, 40) + "...";
    }
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
                   <Link href={mention.link} rel="noopener">
                     {title}
                   </Link>
                 </Typography>
                 <Typography>
                   <Link href={mention.link} rel="noopener">
                    {mention.platform}
                  </Link>
                 </Typography>
                 <Typography>
                   {desc}
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
