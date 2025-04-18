import Color from "color";
import {
  AddressDTO,
  BusinessAddressDTO,
  BusinessDTO,
  DEFAULT_ADDRESS,
  DEFAULT_COORDS,
} from "../_interfaces/interfaces";

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
  [lon1, lat1]: [number, number],
  [lon2, lat2]: [number, number]
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
  pointA: AddressDTO["coordinates"],
  pointB: AddressDTO["coordinates"]
) {
  const price = Math.ceil(haversine(pointA, pointB)) * 100;
  return price;
}

export function calcDynamicDeliveryPrice({
  farthestPickup,
  deliveryPoint,
  currItemPickup,
  deliveryPrice,
  isInCart,
}: {
  farthestPickup: AddressDTO["coordinates"] | undefined;
  deliveryPoint: AddressDTO["coordinates"];
  currItemPickup: AddressDTO["coordinates"];
  deliveryPrice: BusinessDTO["deliveryPrice"];
  isInCart: boolean;
}) {
  if (!farthestPickup) return deliveryPrice;
  if (isInCart) return 0;

  const farthestDistance = haversine(farthestPickup, deliveryPoint);
  const itemDistanceFromFarthestPoint = haversine(
    farthestPickup,
    currItemPickup
  );
  const itemDistanceFromDeliveryPoint = haversine(
    deliveryPoint,
    currItemPickup
  );

  if (farthestDistance === itemDistanceFromDeliveryPoint) return deliveryPrice;
  if (farthestDistance < itemDistanceFromFarthestPoint) return deliveryPrice;

  const deliveryDiscount = 50;
  return applyDiscount({ price: deliveryPrice, percent: deliveryDiscount });
}

export function applyDiscount({
  price,
  percent,
}: {
  price: number;
  percent: number;
}) {
  return (percent / 100) * price;
}

export function sortByFarthestPoint(
  deliveryAddress: AddressDTO = DEFAULT_ADDRESS,
  pickupAddresses: BusinessAddressDTO[]
) {
  return pickupAddresses.sort((a, b) => {
    const distanceOfA = haversine(deliveryAddress.coordinates, a.coordinates);
    const distanceOfB = haversine(deliveryAddress.coordinates, b.coordinates);
    return distanceOfB - distanceOfA;
  });
}

export function isNewFarthestPoint({
  deliveryPoint = DEFAULT_COORDS,
  oldPoint,
  newPoint,
}: {
  deliveryPoint: AddressDTO["coordinates"] | undefined;
  oldPoint: AddressDTO["coordinates"] | undefined;
  newPoint: AddressDTO["coordinates"];
}) {
  if (!oldPoint) return true;
  const distanceOfOldPoint = haversine(deliveryPoint, oldPoint);
  const distanceOfNewPoint = haversine(deliveryPoint, newPoint);
  return distanceOfNewPoint > distanceOfOldPoint;
}
