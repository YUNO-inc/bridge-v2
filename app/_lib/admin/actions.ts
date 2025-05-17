"use server";

import { getAdminAggregates } from "./service";

export async function GetAdminAggregatesAction() {
  return await getAdminAggregates();
}
