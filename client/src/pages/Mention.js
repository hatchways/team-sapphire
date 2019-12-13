import React from "react";
import { Link } from "react-router-dom";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Tooltip,
  Button,
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
  ratingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  iconStyleBlue: {
    height: "50px",
    width: "50px",
    color: "blue"
  },
  iconStyleRed: {
    height: "50px",
    width: "50px",
    color: "red"
  },
  iconStyleNeutral: {
    height: "50px",
    width: "50px",
    color: "gray"
  },
  contentContainer: {
    height: "100%",
    overflow: "hidden"
  },
  cardContent: {
    marginBottom: "10px"
  },
  cardImage: {
    marginLeft: "5%",
    width: "90%",
    height: "90%",
    objectFit: "contain"
  },
  companyName: {
    fontWeight: "bold"
  }
}));

const Mention = ({ mention, index, setOpen }) => {
  const classes = useStyles();
  const handleClickOpen = event => {
    setOpen(true);
  };

  const getSummary = (paragraph, company, length) => {
    let index = paragraph.toLowerCase().search(company.toLowerCase());
    let endIndex = index + company.length;
    if (paragraph.length > length && endIndex >= length) {
      paragraph =
        "..." +
        paragraph.substring(index - length / 2, index + length / 2) +
        "...";
      index = endIndex - (endIndex - length / 2) + 3;
      endIndex = index + company.length;
    } else if (paragraph.length > length && endIndex < length) {
      paragraph = paragraph.substring(0, length) + "...";
    }
    if (index > -1) {
      paragraph = (
        <span>
          {paragraph.substring(0, index)}
          <span className={classes.companyName}>
            {paragraph.substring(index, endIndex)}
          </span>
          {paragraph.substring(endIndex)}
        </span>
      );
    }
    return paragraph;
  };

  const title = getSummary(mention.title, mention.company, 40);
  const content = getSummary(mention.content, mention.company, 200);
  let icon; 
  if(mention.rating !== undefined){
    if(mention.rating > 0){
      icon = <SentimentVerySatisfiedIcon className={classes.iconStyleBlue}></SentimentVerySatisfiedIcon>
    } else if(mention.rating === 0){
      icon = <SentimentSatisfiedIcon className={classes.iconStyleNeutral}></SentimentSatisfiedIcon>
    } else{
      icon = <SentimentVeryDissatisfiedIcon className={classes.iconStyleRed}></SentimentVeryDissatisfiedIcon>
    }
  }

  return (
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
          <Grid item xs={7} className={classes.contentContainer}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h5" component="h2">
                <LinkTo
                  href={mention.link}
                  rel="noopener"
                  className={classes.link}
                >
                  {title}
                </LinkTo>
              </Typography>
              <Typography>{mention.platform}</Typography>
              <Typography>{content}</Typography>
            </CardContent>
          </Grid>
          <Grid item xs={2} className={classes.ratingContainer}>
            <Tooltip title={mention.rating.toFixed(2)} arrow='true'>
              {icon}
            </Tooltip>
          </Grid>
        </Grid>
      </Card>
    </Link>
  );
};

export default Mention;
