import { AddressDTO } from "@/app/_interfaces/interfaces";
import { Circle } from "react-leaflet";

function CurrentCoordCircle({
  currentCoords,
  accuracyRad,
}: {
  currentCoords: AddressDTO["coords"];
  accuracyRad: number;
}) {
  return (
    <Circle
      center={currentCoords}
      radius={accuracyRad}
      pathOptions={{
        color: "blue", // Border (stroke) color
        fillColor: "lightblue", // Background color
        fillOpacity: 0.5, // Transparency of background
        weight: 2, // Border thickness
      }}
    />
  );
}

export default CurrentCoordCircle;
