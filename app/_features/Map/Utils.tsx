import { useMap, useMapEvent } from "react-leaflet";
import { AddressDTO } from "@/app/_interfaces/interfaces";

export function ChangMapView({
  mapCenter,
}: {
  mapCenter: AddressDTO["coords"];
}) {
  const map = useMap();
  map.setView(mapCenter);
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
    setMapCenter([lat, lng]);
  });

  return null;
}
