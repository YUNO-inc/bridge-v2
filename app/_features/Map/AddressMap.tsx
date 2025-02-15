"use client";

import dynamic from "next/dynamic";

const Container = dynamic(() => import("./AddressMapContainer"), {
  ssr: false,
});

function Map() {
  return <Container />;
}

export default Map;
