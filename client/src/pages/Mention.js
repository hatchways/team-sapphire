import React from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Link as LinkTo
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  cardContainer: {
    marginBottom: "10px",
    display: "flex",
    height: "18vh",
    maxHeight: "18vh"
  },
  cardImage: {
    width: "30%"
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

  let title = mention.title;
  let desc = mention.desc;
  let titleIndex = title.search(mention.company) > -1 ? title.search(mention.company) : title.search(mention.company.toLowerCase());
  let titleEnd = titleIndex + mention.company.length;
  let descIndex = desc.search(mention.company) > -1 ? desc.search(mention.company) : desc.search(mention.company.toLowerCase());
  let descEnd = descIndex + mention.company.length;
  if (desc.length > 200 && descEnd >= 200) {
    desc = "..." + desc.substring(descIndex - 100, descIndex + 100) + "...";
    descIndex = descEnd - (descEnd - 100) + 3;
    descEnd = descIndex + mention.company.length;
  } else if (desc.length > 200 && descEnd < 200) {
    desc = desc.substring(0, 200) + "...";
  }
  if (descIndex > -1) {
    desc = <span>
            {desc.substring(0, descIndex)}
            <span className={classes.companyName}>
              {desc.substring(descIndex, descEnd)}
            </span>
            {desc.substring(descEnd)}
          </span>
  }
  if (title.length > 40 && titleEnd >= 40) {
    title = "..." + title.substring(titleIndex - 20, titleIndex + 20) + "...";
    titleIndex = titleEnd - (titleEnd - 20) + 3;
    titleEnd = titleIndex + mention.company.length;
  } else if (title.length > 40 && titleEnd < 40) {
    title = title.substring(0, 40) + "...";
  }
  if (titleIndex > -1) {
    title = <span>
              {title.substring(0, titleIndex)}
              <span className={classes.companyName}>
                {title.substring(titleIndex, titleEnd)}
              </span>
              {title.substring(titleEnd)}
            </span>
  }

  return (
    <div>
      <Link to={`/dashboard/mentions/${index}`}>
        <Card
          className={classes.cardContainer}
          key={index}
          onClick={handleClickOpen}
        >
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
                <LinkTo href={mention.link} rel="noopener">
                  {title}
                </LinkTo>
              </Typography>
              <Typography>
                <LinkTo href={mention.link} rel="noopener">
                  {mention.platform}
                </LinkTo>
              </Typography>
              <Typography>{desc}</Typography>
            </CardContent>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default Mention;
