import { getSingleBusiness } from "@/app/_lib/actions/business/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ businessSlug: string }> }
) {
  const { businessSlug } = await params;
  const business = await getSingleBusiness({ slug: businessSlug });

  return NextResponse.json(business);
}
