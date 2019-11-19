import React, { useState, useEffect } from "react";

import SortToggle from "./SortToggle";
import MentionCard from "./MentionCard";

function Mentions(props) {
  const mentions = props.mentions.map((mention, i) => {
    return <MentionCard
             title={mention.title}
             platform={mention.platform}
             desc={mention.desc}
             key={i}
           />
  })
  return (
    <div>
      <SortToggle />
      {mentions}
    </div>
  );
}

export default Mentions;
