"use server";

import { serializeMongoDocument } from "../utils/helpers";
import { getMyRefData } from "./service";

export async function GetMyRefData() {
  const myRefData = await getMyRefData();
  return serializeMongoDocument(myRefData);
}
