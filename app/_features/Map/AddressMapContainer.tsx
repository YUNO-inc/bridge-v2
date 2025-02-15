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
import { getUser } from "../User/userSlice";
import CurrentCoordCircle from "./CurrentCoordCircle";
import { ChangMapView, DetectClick } from "./Utils";

const DEFAULT_POS: AddressDTO["coords"] = [
  6.510770062610523, 3.3191478252410893,
];
const ZOOM_LEVEL = 16;

function MapContainer() {
  const user = useAppSelector(getUser);
  const searchParams = useSearchParams();
  const fromCurrPosition = searchParams.get("geoposition");

  const selectedAddress =
    user?.addresses?.length &&
    user.addresses.find((a) => a.isSelected === true);

  const [currentCoords, setCurrentCoords] = useState<
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

  useEffect(() => {
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

    async function getCoords() {
      if (!fromCurrPosition) return;
      try {
        const geoPosition = await getCurrentCoords();
        const { latitude, longitude, accuracy } = geoPosition.coords;
        setCurrentCoords({ coords: [latitude, longitude], accuracy: accuracy });
        setMapCenter([latitude, longitude]);
      } catch (err) {
        alert("Unable to locate you...");
        console.log(err);
      }
    }

    setUPIcons();
    getCoords();
  }, [fromCurrPosition]);

  return (
    <Container
      className="w-full h-svh"
      center={mapCenter}
      zoom={ZOOM_LEVEL}
      zoomControl={false}
    >
      {/* altRoadmap */}
      <TileLayer
        url={tiles.stadiaDark}
        attribution="© OpenStreetMap contributors, © CARTO"
      />
      {currentCoords && (
        <CurrentCoordCircle
          currentCoords={currentCoords.coords}
          accuracyRad={currentCoords.accuracy}
        />
      )}
      <DetectClick setMapCenter={setMapCenter} />
      <ChangMapView mapCenter={mapCenter} />
    </Container>
  );
}

const getCurrentCoords = async (): Promise<GeolocationPosition> => {
  const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
  };
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export default MapContainer;
