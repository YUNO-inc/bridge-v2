import { NextRequest, NextResponse } from "next/server";
// import { connect } from "@/app/_lib/db";
import { getItems } from "../../_lib/actions/item/service";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const searchStr = String(searchParams.get("searchStr")) || undefined;
  const lon = Number(searchParams.get("lon")) || undefined;
  const lat = Number(searchParams.get("lat")) || undefined;
  const coords: [number, number] | undefined =
    typeof lon === "number" && typeof lat === "number" ? [lon, lat] : undefined;

  const items = await getItems(searchStr, coords);
  return NextResponse.json(items);
}
