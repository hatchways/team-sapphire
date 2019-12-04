import React from "react";

const MentionDialog = ({ match, mentions }) => {
  const mention = mentions.find((mention, id) => {
    return id === Number(match.params.mentionId);
  });

  return <div>{mention.title}</div>;
};

export default MentionDialog;
