"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import L from "leaflet";
import { MapContainer as Container, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { AddressDTO } from "@/app/_interfaces/interfaces";
import { useAppSelector } from "@/app/_hooks/reduxHooks";
import { getSelectedAddress } from "../User/userSlice";
import CurrentCoordCircle from "./CurrentCoordCircle";
import { ChangMapView, DetectClick } from "./Utils";
import CenterMarker from "./CenterMarker";

const DEFAULT_POS: AddressDTO["coords"] = [
  6.510770062610523, 3.3191478252410893,
];

function MapContainer({ className }: { className?: string }) {
  const selectedAddress = useAppSelector(getSelectedAddress);
  const searchParams = useSearchParams();
  const fromUserPosition = searchParams.get("geoposition");

  const [zoomLevel, setZoomLevel] = useState(16);

  const [userPosition, setUserPosition] = useState<
    { coords: AddressDTO["coords"]; accuracy: number } | undefined
  >(undefined);
  const [mapCenter, setMapCenter] = useState(
    selectedAddress ? selectedAddress.coords : DEFAULT_POS
  );
  const tiles = {
    roadmap: "http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z} ",
    stadiaDark:
      "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=59980a15-7d7c-4d12-93ea-f80b93d525e3",
    cartoDark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  };

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
        const geoPosition = await getUserPosition();
        const { latitude, longitude, accuracy } = geoPosition.coords;
        setUserPosition({ coords: [latitude, longitude], accuracy: accuracy });
        if (fromUserPosition) {
          setMapCenter([latitude, longitude]);
          setZoomLevel(18);
        }
      } catch (err) {
        alert("Unable to locate you...");
        console.log(err);
      }
    }

    getUserGeoPosition();
  }, [fromUserPosition]);

  return (
    <Container
      className={className}
      center={mapCenter}
      zoom={zoomLevel}
      zoomControl={false}
    >
      <TileLayer
        url={tiles.stadiaDark}
        attribution="© OpenStreetMap contributors, © CARTO"
      />
      {userPosition && (
        <CurrentCoordCircle
          currentCoords={userPosition.coords}
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
