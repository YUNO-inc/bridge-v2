import { useMap, useMapEvent } from "react-leaflet";
import { AddressDTO } from "@/app/_interfaces/interfaces";
import { useEffect } from "react";

export function ChangMapView({
  mapCenter,
}: {
  mapCenter: AddressDTO["coords"];
}) {
  const map = useMap();
  useEffect(() => {
    console.log("SETTING MAPCENTER");
    map.setView(mapCenter);
  }, [map, mapCenter]);

  return null;
}

export function DetectClick({
  setMapCenter,
}: {
  setMapCenter: React.Dispatch<React.SetStateAction<AddressDTO["coords"]>>;
}) {
  useMapEvent("click", (e) => {
    const {
      latlng: { lat, lng },
    } = e;
    console.log([lat, lng]);
    setMapCenter([lat, lng]);
  });

  return null;
}
