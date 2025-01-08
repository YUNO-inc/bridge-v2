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
