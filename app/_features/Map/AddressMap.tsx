"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import NewAddressModal from "../Modals/NewAddressModal";
import { AddressDTO } from "@/app/_interfaces/interfaces";

const Container = dynamic(() => import("./AddressMapContainer"), {
  ssr: false,
});

function Map() {
  const [isLoadingGeoPosition, setIsLoadingGeoPosition] = useState(false);
  const [searchLonLat, setSearchLonLat] = useState<
    AddressDTO["coordinates"] | undefined
  >(undefined);

  return (
    <div className="full-viewport">
      <Container
        className="w-full h-[78dvh] sm:h-dvh sm:w-[83vw]"
        setIsLoadingGeoPosition={setIsLoadingGeoPosition}
        searchLonLat={searchLonLat}
      />
      <NewAddressModal
        isLoadingGeoPosition={isLoadingGeoPosition}
        setSearchLonLat={setSearchLonLat}
      />
    </div>
  );
}

export default Map;
