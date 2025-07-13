import { ObjectId } from "mongodb";
import { auth } from "../auth/auth";
import User from "../user/model";
import { UserDTO } from "@/app/_interfaces/interfaces";

export async function getMyRefData(): Promise<{
  totalActivePrice: number;
  newRefs: Pick<UserDTO, "id" | "name" | "referrer">;
  withdrawnRefs: Pick<UserDTO, "id" | "name" | "referrer">;
}> {
  const session = await auth();
  const user = session?.user;

  if (!user?.id)
    throw new Error("Only logged in users can check their referral data.");

  const userId = new ObjectId(user.id);

  const result = await User.aggregate([
    {
      $match: {
        "referrer.referrer": userId,
      },
    },
    {
      $facet: {
        withdrawnRefs: [
          { $match: { "referrer.prizeWithdrawn": true } },
          { $project: { name: 1, referrer: 1 } },
        ],
        newRefs: [
          { $match: { "referrer.prizeWithdrawn": false } },
          { $project: { name: 1, referrer: 1 } },
        ],
      },
    },
    {
      $addFields: {
        totalActivePrice: {
          $sum: "$newRefs.referrer.prizePrice",
        },
      },
    },
  ]);

  return result[0];
}
