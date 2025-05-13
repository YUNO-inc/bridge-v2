"use server";

import { QueryPlaceString, ReverseGeoCode } from "./service";

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
    console.error(err);
  }
}

export async function QueryPlaceStringAction({
  text,
  maxResults = 5,
}: {
  text: string;
  maxResults?: number;
}) {
  try {
    return QueryPlaceString({
      options: {
        IndexName: process.env.AWS_PLACE_INDEX,
        Text: text,
        MaxResults: maxResults,
      },
    });
  } catch (err) {
    console.error(err);
  }
}
