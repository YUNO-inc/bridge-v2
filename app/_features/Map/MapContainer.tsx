"use client";

import {
  MapContainer as Container,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

import { useEffect, useState } from "react";

function MapContainer() {
  const [position] = useState<[number, number]>([51.505, -0.09]);

  useEffect(() => {
    if ("_getIconUrl" in L.Icon.Default.prototype) {
      delete (L.Icon.Default.prototype as Record<string, unknown>)._getIconUrl;
    }

    L.Icon.Default.mergeOptions({
      iconUrl,
      iconRetinaUrl,
      shadowUrl,
    });
  }, []);

  return (
    <Container className="w-full h-[400px]" center={position} zoom={13}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>A marker in London!</Popup>
      </Marker>
    </Container>
  );
}

export default MapContainer;
