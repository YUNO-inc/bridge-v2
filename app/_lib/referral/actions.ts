"use server";

import { getMyRefData } from "./service";

export async function GetMyRefData() {
  const myRefData = await getMyRefData();
  return myRefData;
}
