import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
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
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles({
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
});

function SimpleDialog(props) {
  const classes = useStyles();
  const history = useHistory();
  const { open, mention } = props;

  const handleClose = () => {
    history.push("/dashboard");
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        <Typography variant="h5" component="h2">
          <LinkTo href={mention.link} rel="noopener">
            {mention.title}
          </LinkTo>
        </Typography>
      </DialogTitle>

      <CardMedia
        component="img"
        alt="image"
        image={mention.image}
        title="Image"
        className={classes.cardImage}
      />
      <div>
        <CardContent>
          <Typography>
            <LinkTo href={mention.link} rel="noopener">
              {mention.platform}
            </LinkTo>
          </Typography>
          <Typography>{mention.desc}</Typography>
        </CardContent>
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  open: PropTypes.bool.isRequired
};

const MentionDialog = ({ match, mentions, open, setOpen }) => {
  const handleClose = value => {
    setOpen(false);
  };

  const mention = mentions.find((mention, id) => {
    return id === Number(match.params.mentionId);
  });

  return (
    <div>
      <br />
      <SimpleDialog open={open} onClose={handleClose} mention={mention} />
    </div>
  );
};

export default MentionDialog;
