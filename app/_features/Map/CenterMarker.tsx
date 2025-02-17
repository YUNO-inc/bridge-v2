import { Popup as LeafletPopup } from "leaflet";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Popup, useMap } from "react-leaflet";

const WIDTH_OF_MARKER = 40;

function CenterMarker() {
  const map = useMap();
  const popupRef = useRef<LeafletPopup | null>(null);
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

      map.on("moveend", moveEnd);
      map.on("movestart", moveStart);
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
        Im a popup tied to this marker!
      </Popup>
    </>
  );
}
export default CenterMarker;
