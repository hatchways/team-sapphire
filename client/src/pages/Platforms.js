import React from "react";

import { Switch, Card, CardContent, Typography, Divider } from "@material-ui/core";

function Platforms(props) {
  const platform = props.platforms.map((platform, i) => {
    return <div>
            <Typography>
              {platform.name}
              <Switch
                checked={platform.inUse}
                onChange={() => props.handleChange(i)}
                color="primary"
              />
            </Typography>
            <Divider variant="middle" />
           </div>
  })
  return (
    <div>
      {platform}
    </div>
  );
}

export default Platforms;
