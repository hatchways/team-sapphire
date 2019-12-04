import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
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
      <DialogTitle id="simple-dialog-title">{mention.title}</DialogTitle>
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

  console.log("inside mentiondialog with open: ", open);
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
