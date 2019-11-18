import { Switch, Icon, Card, CardActions, CardContent } from "@material-ui/core";

import React, { useState, useEffect } from "react";

function Platform(props) {
  return (
    <Card>
      <CardContent>
        <Icon>
          {props.name}
        </Icon>
      </CardContent>
      <CardActions>
        <Switch
          checked={props.inUse}
          onChange={() => props.handleChange(props.position)}
        />
      </CardActions>
    </Card>
  );
}

export default Platform;
