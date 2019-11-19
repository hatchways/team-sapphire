import { Switch, Typography } from "@material-ui/core";

import React, { useState, useEffect } from "react";

function SortToggle(props) {
  return (
    <div>
      <Typography variant="h4">
        My mentions
        <Switch/>
      </Typography>

    </div>
  );
}

export default SortToggle;
