import { NextRequest, NextResponse } from "next/server";
import { getSingleItem } from "../../_lib/item/service";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const itemId = searchParams.get("itemId") || undefined;
  const itemSlug = searchParams.get("itemSlug") || "";
  const businessSlug = searchParams.get("businessSlug") || "";

  const item = await getSingleItem({ itemId, itemSlug, businessSlug });
  return NextResponse.json(item);
}
