import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardContent,
  DialogTitle,
  CardMedia,
  Dialog,
  Typography,
  Link as LinkTo
} from "@material-ui/core";

const useStyles = makeStyles({
  dialogContainer: {
    width: "100%"
  },
  cardImage: {
    width: "50%"
  },
  mentionContents: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

function SimpleDialog(props) {
  const classes = useStyles();
  const history = useHistory();
  const { open, mention } = props;

  console.log("inside of simpleDialog with props: ", props);

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
        <Typography variant="h5" component="h2">
          <LinkTo href={mention.link} rel="noopener">
            {mention.title}
          </LinkTo>
        </Typography>
      </DialogTitle>
      <CardContent>
        <LinkTo href={mention.link} rel="noopener">
          {mention.platform}
        </LinkTo>
      </CardContent>

      <CardContent className={classes.mentionContents}>
        <CardMedia
          component="img"
          alt="image"
          image={mention.image}
          title="Image"
          className={classes.cardImage}
        />
        <Typography>{mention.desc}</Typography>
      </CardContent>
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
