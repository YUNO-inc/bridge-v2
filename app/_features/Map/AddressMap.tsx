"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import NewAddressModal from "../Modals/NewAddressModal";

const Container = dynamic(() => import("./AddressMapContainer"), {
  ssr: false,
});

function Map() {
  const [isLoadingGeoPosition, setIsLoadingGeoPosition] = useState(false);

  return (
    <div className="full-viewport">
      <Container
        className="w-full h-[78dvh] sm:h-dvh sm:w-[83vw]"
        setIsLoadingGeoPosition={setIsLoadingGeoPosition}
      />
      <NewAddressModal isLoadingGeoPosition={isLoadingGeoPosition} />
    </div>
  );
}

export default Map;
