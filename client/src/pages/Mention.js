import React from "react";
import { Route, Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Paper,
  Tabs,
  Tab,
  Link as LinkTo
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  mentionsContainer: {
    width: "75%",
    margin: "auto",
    marginTop: "10px"
  },
  sortToggleContainer: {
    float: "right",
    borderRadius: "50px",
    color: "#30336b"
  },
  cardContainer: {
    marginBottom: "10px",
    display: "flex",
    height: "18vh",
    maxHeight: "18vh"
  },
  cardImage: {
    width: "30%"
  },
  header: {
    marginBottom: "20px",
    height: window.innerWidth > 1024 ? "50px" : "100px"
  }
}));

const Mention = ({ mention, index }) => {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.cardContainer} key={index}>
        <CardMedia
          component="img"
          alt="image"
          image={mention.image}
          title="Image"
          className={classes.cardImage}
        />
        <div>
          <CardContent>
            <Link to={`/dashboard/mentions/${index}`}>{mention.title}</Link>
            <Typography variant="h5" component="h2">
              <LinkTo href={mention.link} rel="noopener">
                {mention.title}
              </LinkTo>
            </Typography>
            <Typography>
              <LinkTo href={mention.link} rel="noopener">
                {mention.platform}
              </LinkTo>
            </Typography>
            <Typography>{mention.desc}</Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default Mention;
