"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import L from "leaflet";
import { MapContainer as Container, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { AddressDTO, DEFAULT_COORDS } from "@/app/_interfaces/interfaces";
import { useAppSelector } from "@/app/_hooks/reduxHooks";
import { getSelectedAddress } from "../../User/userSlice";
import CurrentCoordCircle from "./CurrentCoordCircle";
import { ChangMapView, DetectClick } from "./Utils";
import CenterMarker from "./CenterMarker";
import { tiles } from "../config";

function MapContainer({
  className,
  searchLonLat,
  setIsLoadingGeoPosition,
}: {
  className?: string;
  searchLonLat: AddressDTO["coordinates"] | undefined;
  setIsLoadingGeoPosition: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const selectedAddress = useAppSelector(getSelectedAddress);
  const searchParams = useSearchParams();
  const fromUserPosition = searchParams.get("geoposition");

  const [zoomLevel, setZoomLevel] = useState(16);
  const [userPosition, setUserPosition] = useState<
    { coordinates: AddressDTO["coordinates"]; accuracy: number } | undefined
  >(undefined);
  const [mapCenter, setMapCenter] = useState(
    selectedAddress ? selectedAddress.coordinates : DEFAULT_COORDS
  );

  useEffect(
    function () {
      if (searchLonLat) {
        setZoomLevel(18);
        setMapCenter(searchLonLat);
      }
    },
    [searchLonLat]
  );

  useEffect(function () {
    function setUPIcons() {
      if ("_getIconUrl" in L.Icon.Default.prototype) {
        delete (L.Icon.Default.prototype as Record<string, unknown>)
          ._getIconUrl;
      }
      L.Icon.Default.mergeOptions({
        iconUrl,
        iconRetinaUrl,
        shadowUrl,
      });
    }
    setUPIcons();
  }, []);

  useEffect(() => {
    async function getUserGeoPosition() {
      try {
        setIsLoadingGeoPosition(!!fromUserPosition && true);
        const geoPosition = await getUserPosition();
        setIsLoadingGeoPosition(false);
        const { latitude, longitude, accuracy } = geoPosition.coords;
        setUserPosition({
          coordinates: [longitude, latitude],
          accuracy: accuracy,
        });
        if (fromUserPosition) {
          setMapCenter([longitude, latitude]);
          setZoomLevel(18);
        }
      } catch (err) {
        alert("Unable to locate you...");
        console.error(err);
      }
    }

    getUserGeoPosition();
  }, [fromUserPosition, setIsLoadingGeoPosition]);

  return (
    <Container
      className={className}
      center={[mapCenter[1], mapCenter[0]]}
      zoom={zoomLevel}
      zoomControl={false}
    >
      <TileLayer
        url={tiles.stadiaDark}
        attribution="© OpenStreetMap contributors, © Stadia Maps"
      />
      {userPosition && (
        <CurrentCoordCircle
          currentCoords={userPosition.coordinates}
          accuracyRad={userPosition.accuracy}
        />
      )}
      <DetectClick setMapCenter={setMapCenter} />
      <ChangMapView mapCenter={mapCenter} />
      <CenterMarker />
    </Container>
  );
}

const getUserPosition = async (): Promise<GeolocationPosition> => {
  const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
  };
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export default MapContainer;
