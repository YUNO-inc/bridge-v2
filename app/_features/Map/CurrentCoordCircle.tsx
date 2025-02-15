import { AddressDTO } from "@/app/_interfaces/interfaces";
import { Circle } from "react-leaflet";

function CurrentCoordCircle({
  currentCoords,
  accuracyRad,
}: {
  currentCoords: AddressDTO["coords"];
  accuracyRad: number;
}) {
  const [MAX_RAD, MIN_RAD] = [5000, 100];
  function adjustRadius() {
    if (accuracyRad <= MAX_RAD && accuracyRad >= MIN_RAD) return accuracyRad;
    else if (accuracyRad > MAX_RAD) return MAX_RAD;
    else return MIN_RAD;
  }

  return (
    <Circle
      center={currentCoords}
      radius={adjustRadius()}
      pathOptions={{
        color: "#3b82f650",
        fillColor: "#3b82f6",
        fillOpacity: 0.1,
        weight: 1,
      }}
    />
  );
}

export default CurrentCoordCircle;
