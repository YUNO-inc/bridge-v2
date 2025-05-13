import { QueryPlaceString } from "@/app/_lib/location/service";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");
  const MAX_RESULTS = 5;
  const BIAS_POSITION = [6.5244, 3.3792];

  if (!text) return NextResponse.json([], { status: 200 });

  const results = await QueryPlaceString({
    options: {
      IndexName: process.env.AWS_PLACE_INDEX,
      Text: text,
      MaxResults: MAX_RESULTS,
      BiasPosition: BIAS_POSITION,
    },
  });

  return NextResponse.json(results, { status: 200 });
}
