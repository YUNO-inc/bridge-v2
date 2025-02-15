"use client";

import {
  MapContainer as Container,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

import { useEffect, useState } from "react";
import { AddressDTO } from "@/app/_interfaces/interfaces";
import { useAppSelector } from "@/app/_hooks/reduxHooks";
import { getUser } from "../User/userSlice";
import CurrentCoordCircle from "./CurrentCoordCircle";

function MapContainer() {
  const DEFAULT_POS: AddressDTO["coords"] = [
    6.510770062610523, 3.3191478252410893,
  ];
  const ZOOM_LEVEL = 16;
  const user = useAppSelector(getUser);
  const selectedAddress =
    user?.addresses?.length &&
    user.addresses.find((a) => a.isSelected === true);
  const [currentCoords, setCurrentCoords] = useState<
    { coords: AddressDTO["coords"]; accuracy: number } | undefined
  >(undefined);
  const [position, setPosition] = useState(
    selectedAddress ? selectedAddress.coords : DEFAULT_POS
  );
  const tiles = {
    roadmap: "http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z} ",
    stadiaDark:
      "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=59980a15-7d7c-4d12-93ea-f80b93d525e3",
    cartoDark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  };

  useEffect(() => {
    if ("_getIconUrl" in L.Icon.Default.prototype) {
      delete (L.Icon.Default.prototype as Record<string, unknown>)._getIconUrl;
    }

    L.Icon.Default.mergeOptions({
      iconUrl,
      iconRetinaUrl,
      shadowUrl,
    });

    async function getPOS() {
      try {
        const geoPosition = await getPosition();
        const { latitude, longitude, accuracy } = geoPosition.coords;
        setCurrentCoords({ coords: [latitude, longitude], accuracy: accuracy });
        alert(`GeoPosition Found Successfully. Accuracy: ${accuracy}`);
      } catch (err) {
        alert(`Unable to locate you..., ${err?.message}`);
        console.log(err);
      }
    }
    getPOS();
  }, []);

  return (
    <Container
      className="w-full h-svh"
      center={position}
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
      <DetectClick setPosition={setPosition} />
      <ChangMapView position={position} />
    </Container>
  );
}

function ChangMapView({ position }: { position: AddressDTO["coords"] }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick({
  setPosition,
}: {
  setPosition: React.Dispatch<React.SetStateAction<AddressDTO["coords"]>>;
}) {
  useMapEvent("click", (e) => {
    const {
      latlng: { lat, lng },
    } = e;
    setPosition([lat, lng]);
  });

  return null;
}

const getPosition = async (): Promise<GeolocationPosition> => {
  const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
  };
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export default MapContainer;

// const options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0,
// };
// navigator.geolocation.getCurrentPosition(
//   (position) => {
//     const { latitude, longitude } = position.coords;
//     // setPosition([latitude, longitude]);
//     // console.log(latitude, longitude);
//   },
//   (error) => console.error(error),
//   options
// );
