import { NextResponse } from "next/server";
import { getAdminAggregates } from "@/app/_lib/admin/service";

export async function GET() {
  const aggregates = await getAdminAggregates();
  return NextResponse.json(aggregates);
}
