import { ReverseGeoCode } from "./service";

export async function ReverseGeoCodeAction({
  lat,
  lng,
  maxResults = 1,
}: {
  lat: number;
  lng: number;
  maxResults?: number;
}) {
  try {
    return ReverseGeoCode({
      options: {
        IndexName: process.env.AWS_PLACE_INDEX,
        Position: [lng, lat],
        MaxResults: maxResults,
      },
    });
  } catch (err) {
    console.log(err);
  }
}
