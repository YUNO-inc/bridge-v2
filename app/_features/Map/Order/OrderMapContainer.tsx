"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { tiles } from "../config";

function OrderMapContainer({ className }: { className: string }) {
  return (
    <MapContainer
      className={className}
      center={[6.35343, 8.32343]}
      zoom={10}
      zoomControl={false}
    >
      <TileLayer
        url={tiles.stadiaDark}
        attribution="© OpenStreetMap contributors, © Stadia Maps"
      />
    </MapContainer>
  );
}

export default OrderMapContainer;
