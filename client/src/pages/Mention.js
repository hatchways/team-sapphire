import React from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Link as LinkTo
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none"
    }
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
  }
}));

const Mention = ({ mention, index, setOpen }) => {
  const classes = useStyles();
  const handleClickOpen = event => {
    setOpen(true);
  };

  return (
    <div>
      <Link to={`/dashboard/mentions/${index}`} className={classes.link}>
        <Card
          className={classes.cardContainer}
          key={index}
          onClick={handleClickOpen}
        >
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
                  <LinkTo href={mention.link} rel="noopener" className={classes.link}>
                    {mention.title}
                  </LinkTo>
                </Typography>
                <Typography>{mention.platform}</Typography>
                <Typography>{mention.desc}</Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Link>
    </div>
  );
};

export default Mention;
