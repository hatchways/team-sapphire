import React, { useState, useEffect } from "react";

import SortToggle from "./SortToggle";
import MentionCard from "./MentionCard";

function Mentions(props) {
  return (
    <div>
      <SortToggle />
      <MentionCard />
    </div>
  );
}

export default Mentions;
