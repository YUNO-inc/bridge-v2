import { AddressDTO } from "@/app/_interfaces/interfaces";
import { Popup as LeafletPopup } from "leaflet";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Popup, useMap } from "react-leaflet";

const WIDTH_OF_MARKER = 40;

function CenterMarker() {
  const map = useMap();
  const popupRef = useRef<LeafletPopup | null>(null);
  const [address, setAddress] = useState<AddressDTO["name"]>("");
  const [position, setPosition] = useState(map.getCenter());

  useEffect(
    function () {
      function moveEnd() {
        setPosition(map.getCenter());
        if (popupRef.current) popupRef.current.openPopup();
      }
      function moveStart() {
        if (popupRef.current) popupRef.current.close();
      }

      async function getPositionAddress() {
        const { lat, lng } = map.getCenter();
        const address = await getAddress([lat, lng]);
        console.log(address);
        setAddress("found");
      }

      map.on("moveend", moveEnd);
      map.on("movestart", moveStart);
      getPositionAddress();
      return () => {
        map.off("moveend", moveEnd);
        map.off("movestart", moveStart);
      };
    },
    [map]
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
        {address}
      </Popup>
    </>
  );
}
export default CenterMarker;

async function getAddress(coords: AddressDTO["coords"]) {
  const [latitude, longitude] = coords;
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  return data;
}
