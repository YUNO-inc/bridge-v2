// import Item from "../item/model";

import { getADMIN_IDS } from "@/app/_utils/helpers";
import { auth } from "../auth/auth";

export async function getAdminAggregates() {
  const session = await auth();
  const user = session?.user;
  const ADMIN_IDS = getADMIN_IDS();

  if (process.env.NODE_ENV !== "development") {
    if (!user || !ADMIN_IDS.includes(user.id || ""))
      throw new Error("Unathorised access");
  }

  return { a: true };
}
