import React from "react";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Paper,
  Tabs,
  Tab,
  Link,
  Grid
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  mentionsContainer: {
    width: "50vw",
    marginLeft: "90px",
    marginTop: "50px"
  },
  sortToggleContainer: {
    float: "right",
    borderRadius: "50px",
    color: "#30336b",
    height: "50px"
  },
  cardContainer: {
    display: "flex",
    height: "170px",
    margin: "20px 20px 20px 0",
    overflow: "hidden",
    width: "48.5vw"
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  contentContainer: {
    height: "100%"
  },
  cardImage: {
    marginLeft: "5%",
    width: "90%",
    height: "90%",
    objectFit: "contain"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    marginRight: "20px",
    fontWeight: 900,
    lineHeight: "25px",
    letterSpacing: "1px",
    height: window.innerWidth > 1024 ? "50px" : "100px"
  }
}));

function Mentions(props) {
  const classes = useStyles();
  const mentions = props.mentions.map((mention, i) => {
    return (
      <Card className={classes.cardContainer} key={i}>
        <Grid container>
          <Grid item xs={3} className={classes.imageContainer}>
            <CardMedia
              component="img"
              alt="image"
              image={mention.image}
              title="Image"
              className={classes.cardImage}
            />
          </Grid>
          <Grid item xs={9} className={classes.contentContainer}>
            <CardContent>
              <Typography variant="h5" component="h2">
                <Link href={mention.link} rel="noopener">
                  {mention.title}
                </Link>
              </Typography>
              <Typography>{mention.platform}</Typography>
              <Typography>{mention.desc}</Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    );
  });
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
            <Tab label="Most recent" className={classes.sortToggleContainer} />
            <Tab label="Most popular" className={classes.sortToggleContainer} />
          </Tabs>
        </Paper>
      </Typography>
      {mentions}
    </div>
  );
}

export default Mentions;
