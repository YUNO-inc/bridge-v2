"use server";

import { BusinessDTO, DEFAULT_COORDS } from "@/app/_interfaces/interfaces";
import {
  createBusiness,
  getMultipleBusinesses,
  getNearBusinesses,
  getSingleBusiness,
} from "./service";
import { serializeMongoDocument } from "../../utils/helpers";

export async function CreateBusinessAction(
  business: Pick<BusinessDTO, "name" | "address" | "profileImg">
) {
  try {
    await createBusiness(business);
  } catch (err: unknown) {
    const error = err as Error;
    console.error(error);
    throw new Error(error?.message || "Unable to create business account.");
  }
}

export async function GetSingleBusinessAction(
  queryData: Partial<BusinessDTO>
): Promise<BusinessDTO | null> {
  try {
    const business = await getSingleBusiness(queryData);
    return serializeMongoDocument(business);
  } catch (err: unknown) {
    const error = err as Error;
    console.error(error);
    throw new Error(error?.message || "Unable to identify Organisation.");
  }
}

export async function GetMultipleBusinessesAction(
  queryData: Partial<BusinessDTO>
): Promise<BusinessDTO[]> {
  try {
    const businesses = await getMultipleBusinesses(queryData);
    return serializeMongoDocument(businesses);
  } catch (err: unknown) {
    const error = err as Error;
    console.error(error);
    throw new Error(error?.message || "Unable to identify Organisation.");
  }
}

export async function GetNearBusinessesAction(
  coords: BusinessDTO["address"]["coordinates"] = DEFAULT_COORDS
) {
  try {
    const businesses = await getNearBusinesses(coords);
    return businesses;
  } catch (err: unknown) {
    const error = err as Error;
    console.error(error);
    throw new Error(
      error?.message || "Unable to find nearby business for your location"
    );
  }
}
