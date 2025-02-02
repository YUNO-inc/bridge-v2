"use client";

import { useRouter } from "next/navigation";
import SegmentedControl from "../SegmentedControl/SegmentedControl";
import { useState } from "react";
import { useSession } from "next-auth/react";

function ActivityControlsSegmentedControl() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  function handleClick(pageName: string) {
    if (pageName === "signin") {
      setIsLoading(true);
      router.push("/auth");
    } else setIsLoading(false);
  }

  if (session !== null) return null;

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
