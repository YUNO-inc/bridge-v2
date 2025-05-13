import {
  BUSINESS_TYPES,
  BusinessTypesDTO,
  DEFAULT_COORDS,
} from "@/app/_interfaces/interfaces";
import { getNearBusinesses } from "@/app/_lib/business/service";
import { NextRequest, NextResponse } from "next/server";

function isBusinessTypesDTO(type: string): type is BusinessTypesDTO {
  return BUSINESS_TYPES.includes(type as BusinessTypesDTO);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lon = Number(searchParams.get("lon")) || undefined;
  const lat = Number(searchParams.get("lat")) || undefined;
  const businessTypes: BusinessTypesDTO[] = searchParams
    .getAll("businessType")
    .filter((type): type is BusinessTypesDTO => isBusinessTypesDTO(type));
  const coords: [number, number] =
    typeof lon === "number" && typeof lat === "number"
      ? [lon, lat]
      : DEFAULT_COORDS;

  const businesses = await getNearBusinesses(coords, { businessTypes });

  return NextResponse.json(businesses);
}
