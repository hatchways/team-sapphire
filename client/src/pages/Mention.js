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
      paragraph = "..." + paragraph.substring(index - length/2, index + length/2) + "...";
      index = endIndex - (endIndex - length/2) + 3;
      endIndex = index + company.length;
    } else if (paragraph.length > length && endIndex < length) {
      paragraph = paragraph.substring(0, length) + "...";
    }
    if (index > -1) {
      paragraph = <span>
                {paragraph.substring(0, index)}
                <span className={classes.companyName}>
                  {paragraph.substring(index, endIndex)}
                </span>
                {paragraph.substring(endIndex)}
              </span>
    }
    return paragraph;
  }

  const title = getSummary(mention.title, mention.company, 40);
  const content = getSummary(mention.content, mention.company, 200);

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
          <Grid item xs={9} className={classes.contentContainer}>
            <CardContent>
              <Typography variant="h5" component="h2">
                <LinkTo href={mention.link} rel="noopener" className={classes.link}>
                  {title}
                </LinkTo>
              </Typography>
              <Typography>{mention.platform}</Typography>
              <Typography>{content}</Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Link>
  );
};

export default Mention;
