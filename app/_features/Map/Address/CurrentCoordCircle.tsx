import L from "leaflet";
import { AddressDTO } from "@/app/_interfaces/interfaces";
import { Circle, Marker } from "react-leaflet";

const customIcon = new L.Icon({
  iconUrl: "/images/leaflet/curr-position.png", // Replace with your image path
  iconSize: [15, 15], // Icon dimensions
  iconAnchor: [7.5, 7.5], // Centered anchor (half of width & height)
  popupAnchor: [0, -10], // Popup above the center
});

function CurrentCoordCircle({
  currentCoords,
  accuracyRad,
}: {
  currentCoords: AddressDTO["coordinates"];
  accuracyRad: number;
}) {
  const [MAX_RAD, MIN_RAD] = [300, 2];
  function adjustRadius() {
    if (accuracyRad <= MAX_RAD && accuracyRad >= MIN_RAD) return accuracyRad;
    else if (accuracyRad > MAX_RAD) return MAX_RAD;
    else return MIN_RAD;
  }

  return (
    <>
      <Circle
        center={[currentCoords[1], currentCoords[0]]}
        radius={adjustRadius()}
        pathOptions={{
          color: "#3b82f650",
          fillColor: "#3b82f6",
          fillOpacity: 0.1,
          weight: 1,
        }}
      />
      <Marker
        position={[currentCoords[1], currentCoords[0]]}
        icon={customIcon}
      />
    </>
  );
}

export default CurrentCoordCircle;
