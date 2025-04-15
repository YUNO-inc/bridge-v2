import Color from "color";

export function getRGB(color: string): string {
  try {
    const parsedColor = Color(color); // Parse the color
    const { r, g, b } = parsedColor.rgb().object(); // Extract RGB values
    return `${r}, ${g}, ${b}`;
  } catch {
    throw new Error(`Invalid color format: ${color}`);
  }
}

export function cleanObject(objectToClean: object) {
  for (const key of Object.keys(objectToClean) as Array<
    keyof typeof objectToClean
  >) {
    if (!objectToClean[key]) delete objectToClean[key];
  }
  return objectToClean;
}

export function haversine(
  [lat1, lon1]: [number, number],
  [lat2, lon2]: [number, number]
) {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in km
}

export function calcDeliveryPrice(
  [lat1, lon1]: [number, number],
  [lat2, lon2]: [number, number]
) {
  const price = Math.ceil(haversine([lat1, lon1], [lat2, lon2])) * 100;
  return price;
}

// console.log(calcDeliveryPrice([6.507484, 3.322128], [6.517877, 3.317182]));
