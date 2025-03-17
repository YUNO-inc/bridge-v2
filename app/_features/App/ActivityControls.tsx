"use client";

import { useState } from "react";
import BusinessTypes from "../BusinessTypes/BusinessTypes";
import ActivityContainer from "./ActivityContainer/ActivityContainer";
import ActivitySearch from "./ActivitySearch/ActivitySearch";

function ActivityControls() {
  const [searchStr, setSearchStr] = useState("");

  return (
    <div className="mt-auto pt-2">
      <div className="flex flex-col items-center gap-3 mx-auto pb-6 px-4 max-w-screen-sm">
        <BusinessTypes />
        <ActivityContainer searchStr={searchStr} />
        <ActivitySearch searchStr={searchStr} setSearchStr={setSearchStr} />
      </div>
    </div>
  );
}

export default ActivityControls;
