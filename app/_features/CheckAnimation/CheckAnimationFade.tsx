"use client";

import { useEffect, useState } from "react";
import CheckAnimation from "./CheckAnimation";
import { CheckAnimationProps } from "./interfaces";

function CheckAnimationFade({
  size,
  color,
  loaderIterationCount = 2,
  durationPerCircle = 1,
  message,
}: CheckAnimationProps) {
  const fadeTime = (loaderIterationCount + 1) * durationPerCircle + 1;
  const [fade, setFade] = useState(false);

  useEffect(
    function () {
      setTimeout(() => setFade(true), fadeTime * 1000);
    },
    [fadeTime]
  );

  return (
    <div
      className={`absolute h-full w-full bg-background z-40 transition-opacity duration-700 ${
        fade ? "invisible opacity-0" : "visible opacity-100"
      }`}
    >
      <CheckAnimation
        message={message}
        durationPerCircle={durationPerCircle}
        loaderIterationCount={loaderIterationCount}
        color={color}
        size={size}
      />
    </div>
  );
}

export default CheckAnimationFade;
