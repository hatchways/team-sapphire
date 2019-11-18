import React, { useState, useEffect } from "react";

import Platform from "./Platform";

function PlatformList(props) {
  const platform = props.platforms.map((platform, i) => {
    return <Platform
             name={platform.name}
             inUse={platform.inUse}
             key={i}
             position={i}
             handleChange={props.handleChange}
           />
  })
  return (
    <div>
      {platform}
    </div>
  );
}

export default PlatformList;
