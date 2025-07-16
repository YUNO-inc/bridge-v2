"use server";

import { serializeMongoDocument } from "../utils/helpers";
import { addRefPageVisits, getMyRefData } from "./service";

export async function GetMyRefData() {
  const myRefData = await getMyRefData();
  return serializeMongoDocument(myRefData);
}

export async function AddRefPageVisits(referrerId: string) {
  await addRefPageVisits(referrerId);
}
