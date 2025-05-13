"use client";

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import MajorLinkClient from "./MajorLinkClient";
import { SignOutAction } from "@/app/_lib/auth/actions";
import { useState } from "react";

function SignOutBtn() {
  const [isLoading, setIsLoading] = useState(false);
  function handleSignOut() {
    if (confirm("Are you sure you want to sign out?")) {
      setIsLoading(true);
      SignOutAction();
    }
  }

  return (
    <MajorLinkClient
      className="mt-auto mb-5 text-app-red-300 rounded-2xl"
      icon={
        <ArrowRightStartOnRectangleIcon className="stroke-current w-6 h-6" />
      }
      text="Sign Out"
      elementType="button"
      onClick={handleSignOut}
      isLoading={isLoading}
    />
  );
}

export default SignOutBtn;
