import { useMap, useMapEvent } from "react-leaflet";
import { AddressDTO } from "@/app/_interfaces/interfaces";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function ChangMapView({
  mapCenter,
}: {
  mapCenter: AddressDTO["coordinates"];
}) {
  const map = useMap();
  useEffect(() => {
    map.setView([mapCenter[1], mapCenter[0]]);
  }, [map, mapCenter]);

  return null;
}

export function DetectClick({
  setMapCenter,
}: {
  setMapCenter: React.Dispatch<React.SetStateAction<AddressDTO["coordinates"]>>;
}) {
  const searchParams = useSearchParams();
  const fromUserPosition = searchParams.get("geoposition");
  const router = useRouter();

  useMapEvent("click", (e) => {
    const {
      latlng: { lat, lng },
    } = e;
    setMapCenter([lng, lat]);

    if (fromUserPosition) {
      const params = new URLSearchParams(searchParams);
      params.delete("geoposition");
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  });

  return null;
}
