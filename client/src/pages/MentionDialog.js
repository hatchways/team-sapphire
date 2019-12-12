import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardContent,
  DialogTitle,
  DialogContent,
  DialogContentText,
  CardMedia,
  Dialog,
  Typography,
  Link as LinkTo
} from "@material-ui/core";

const useStyles = makeStyles({
  dialogContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  cardImage: {
    width: "50%",
    height: "50%",
    objectFit: "contain",
    margin: "auto"
  },
  mentionContents: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "90%"
  }
});

function SimpleDialog(props) {
  const classes = useStyles();
  const history = useHistory();
  const { open, mention } = props;

  const handleClose = () => {
    history.push("/dashboard");
  };

  return mention ? (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      className={classes.dialogContainer}
    >
      <DialogTitle id="simple-dialog-title">
        <LinkTo href={mention.link} rel="noopener">
          {mention.title}
        </LinkTo>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{mention.platform}</DialogContentText>
        <CardContent className={classes.mentionContents}>
          <CardMedia
            component="img"
            alt="image"
            image={mention.image}
            title="Image"
            className={classes.cardImage}
          />
          <DialogContentText>{mention.content}</DialogContentText>
        </CardContent>
      </DialogContent>
    </Dialog>
  ) : null;
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
      <SimpleDialog open={open} onClose={handleClose} mention={mention} />
    </div>
  );
};

export default MentionDialog;
