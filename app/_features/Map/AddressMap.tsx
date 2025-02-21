"use client";

import dynamic from "next/dynamic";
import FlexibleModal from "../Modals/FlexibleModal";
import { useEffect } from "react";

const Container = dynamic(() => import("./AddressMapContainer"), {
  ssr: false,
});

function Map() {
  useEffect(() => {
    // Prevent scrolling when map is full viewport
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="full-viewport">
      <Container className="w-full h-[78dvh] sm:h-dvh sm:w-[83vw]" />
      <FlexibleModal className="h-[40dvh] w-svw min-w-min sm:h-dvh sm:w-[20vw] sm:rounded-l-2xl sm:rounded-r-none" />
    </div>
  );
}

export default Map;
