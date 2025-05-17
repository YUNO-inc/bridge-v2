import { getADMIN_IDS } from "@/app/_utils/helpers";
import { auth } from "../auth/auth";
import Order from "../order/model";
import { adminPipeline } from "./pipelines";

export async function getAdminAggregates() {
  const session = await auth();
  const user = session?.user;
  // const ADMIN_IDS = getADMIN_IDS();

  console.error(user);
  // if (process.env.NODE_ENV !== "development") {
  // if (!user || !ADMIN_IDS.includes(user.id || ""))
  //   throw new Error("Unathorised access");
  // }

  const [adminAggregates] = await Order.aggregate(adminPipeline).exec();

  return adminAggregates;
}
