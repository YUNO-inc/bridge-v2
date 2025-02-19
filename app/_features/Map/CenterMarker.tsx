import { AddressDTO } from "@/app/_interfaces/interfaces";
import { ReverseGeoCodeAction } from "@/app/_lib/actions/user/actions";
import { Popup as LeafletPopup } from "leaflet";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Popup, useMap } from "react-leaflet";

const WIDTH_OF_MARKER = 40;

function CenterMarker() {
  const map = useMap();
  const popupRef = useRef<LeafletPopup | null>(null);
  const [address, setAddress] = useState<Partial<AddressDTO> | string>("");
  const [position, setPosition] = useState(map.getCenter());
  const addressRequestRef = useRef(0);

  const getPositionAddress = useCallback(
    async function () {
      const currentRequestRef = ++addressRequestRef.current;
      setAddress("");
      try {
        const { lat, lng } = map.getCenter();
        const newByAddresses = await getAddress([lat, lng]);
        console.log(newByAddresses);
        if (!newByAddresses?.length) throw new Error();
        const address = newByAddresses[0].Place;
        if (currentRequestRef !== addressRequestRef.current) return;
        setAddress({
          name:
            address?.Label ||
            address?.Street ||
            address?.SubMunicipality ||
            address?.Municipality ||
            address?.Region ||
            "No address found",
          coords: address?.Geometry?.Point?.length
            ? [address.Geometry.Point[0], address.Geometry.Point[1]]
            : undefined,
        });
      } catch (error) {
        if (currentRequestRef !== addressRequestRef.current) return;
        setAddress("No address found");
        console.log(error);
      }
    },
    [map]
  );

  useEffect(
    function () {
      getPositionAddress();
    },
    [getPositionAddress]
  );

  useEffect(
    function () {
      function moveEnd() {
        setPosition(map.getCenter());
        if (popupRef.current) popupRef.current.openPopup();
        getPositionAddress();
      }
      function moveStart() {
        if (popupRef.current) popupRef.current.close();
      }

      map.on("moveend", moveEnd);
      map.on("movestart", moveStart);
      return () => {
        map.off("moveend", moveEnd);
        map.off("movestart", moveStart);
      };
    },
    [map, getPositionAddress]
  );

  return (
    <>
      <Image
        src="/images/leaflet/pin-2.png"
        width={40}
        height={40}
        alt="marker icon"
        className="z-[999] translate-x-[-50%]"
        style={{
          position: "absolute",
          left: `calc(50%)`,
          top: `calc(50% - ${WIDTH_OF_MARKER / 2}px)`,
          transform: `translate(-50%, -50%)`,
        }}
      />
      <Popup
        position={position}
        autoClose={false}
        closeOnClick={false}
        offset={[0, -WIDTH_OF_MARKER]}
        closeButton={false}
        ref={popupRef}
      >
        {typeof address !== "string" ? address.name : address}
      </Popup>
    </>
  );
}
export default CenterMarker;

async function getAddress(coords: AddressDTO["coords"]) {
  const [lat, lng] = coords;
  const data = await ReverseGeoCodeAction({ lat, lng });

  return data;
}
