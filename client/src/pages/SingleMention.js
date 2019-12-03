import React from "react";

const SingleMention = ({ match }) => {
  return <div>{match.params.id}</div>;
};

export default SingleMention;
