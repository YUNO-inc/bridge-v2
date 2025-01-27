"use client";

import { useRouter } from "next/navigation";
import SegmentedControl from "../SegmentedControl/SegmentedControl";
import { useState } from "react";

function ActivityControlsSegmentedControl() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  function handleClick(pageName: string) {
    if (pageName === "signin") {
      setIsLoading(true);
      router.push("/auth");
    } else setIsLoading(false);
  }

  return (
    <div className="flex justify-center">
      <SegmentedControl
        labels={["guest", "signin"]}
        handleClick={handleClick}
        activeIndex={0}
        showLoader={isLoading}
      />
    </div>
  );
}

export default ActivityControlsSegmentedControl;
