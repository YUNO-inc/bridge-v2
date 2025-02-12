"use client";

import dynamic from "next/dynamic";

const Container = dynamic(() => import("./MapContainer"), { ssr: false });

function Map() {
  return <Container />;
}

export default Map;
