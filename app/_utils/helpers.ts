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
