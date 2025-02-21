"use client";

import dynamic from "next/dynamic";
import FlexibleModal from "../Modals/FlexibleModal";

const Container = dynamic(() => import("./AddressMapContainer"), {
  ssr: false,
});

function Map() {
  return (
    <>
      <Container className="w-full h-[78svh] sm:h-svh sm:w-[83vw]" />
      <FlexibleModal className="h-[40svh] w-svw sm:h-svh sm:w-[20vw] sm:rounded-l-2xl sm:rounded-r-none" />
    </>
  );
}

export default Map;
