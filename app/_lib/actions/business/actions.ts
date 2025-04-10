"use server";

import { BusinessDTO } from "@/app/_interfaces/interfaces";
import { createBusiness, getSingleBusiness } from "./service";
import { serializeMongoDocument } from "../../utils/helpers";

export async function CreateBusinessAction(
  business: Pick<BusinessDTO, "name" | "address" | "profileImg">
) {
  try {
    await createBusiness(business);
  } catch {
    throw new Error("Unable to create business account.");
  }
}

export async function GetSingleBusinessAction(
  queryData: Partial<BusinessDTO>
): Promise<BusinessDTO | null> {
  try {
    const business = await getSingleBusiness(queryData);
    return serializeMongoDocument(business);
  } catch {
    throw new Error("Unable to identify Organisation.");
  }
}
