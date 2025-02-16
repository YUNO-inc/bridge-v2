"use client";

import dynamic from "next/dynamic";
import FlexibleModal from "../Modals/FlexibleModal";

const Container = dynamic(() => import("./AddressMapContainer"), {
  ssr: false,
});

function Map() {
  return (
    <>
      <Container />
      <FlexibleModal />
    </>
  );
}

export default Map;
