import { Card, CardContent, Typography } from "@material-ui/core";

import React from "react";

function MentionCard(props) {
  return (
    <Card>
      <CardContent>
        <Typography>
          {props.title}
        </Typography>
        <Typography>
          {props.platform}
        </Typography>
        <Typography>
          {props.desc}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MentionCard;
