import { NextRequest, NextResponse } from "next/server";
import { getItems } from "@/app/_lib/item/service";
import { ItemDTO } from "@/app/_interfaces/interfaces";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const searchStr = searchParams.get("searchStr") || undefined;
  const businessId = searchParams.get("businessId") || undefined;
  const lon = Number(searchParams.get("lon")) || undefined;
  const lat = Number(searchParams.get("lat")) || undefined;
  const coords: [number, number] | undefined =
    typeof lon === "number" && typeof lat === "number" ? [lon, lat] : undefined;
  const findBy: Partial<ItemDTO> = {};

  if (businessId !== "null" && !!businessId) findBy.businessData = businessId;

  const items = await getItems(searchStr, coords, findBy);
  return NextResponse.json(items);
}
