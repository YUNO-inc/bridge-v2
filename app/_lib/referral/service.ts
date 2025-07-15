import { ObjectId } from "mongodb";
import { auth } from "../auth/auth";
import User from "../user/model";
import { UserDTO } from "@/app/_interfaces/interfaces";

export async function getMyRefData(): Promise<{
  totalActivePrizePrice: number;
  totalWithdrawnPrizePrice: number;
  newRefs: Pick<UserDTO, "id" | "createdAt" | "referrer">[];
  withdrawnRefs: Pick<UserDTO, "id" | "createdAt" | "referrer">[];
}> {
  const session = await auth();
  const user = session?.user;

  if (!user?.id) {
    if (process.env.NODE_ENV === "development")
      return {
        totalActivePrizePrice: 400,
        totalWithdrawnPrizePrice: 400,
        newRefs: [],
        withdrawnRefs: [
          {
            id: "6875a5a2f817887df05c15be",
            referrer: {
              referrer: "6839d36a092f4f44f1045573",
              prizeWithdrawn: true,
              prizePrice: 400,
            },
            createdAt: new Date("2025-07-13T00:49:38.451Z"),
          },
        ],
      };
    throw new Error("Only logged in users can check their referral data.");
  }

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
          {
            $project: { id: { $toString: "$_id" }, createdAt: 1, referrer: 1 },
          },
        ],
        newRefs: [
          { $match: { "referrer.prizeWithdrawn": false } },
          {
            $project: { id: { $toString: "$_id" }, createdAt: 1, referrer: 1 },
          },
        ],
      },
    },
    {
      $addFields: {
        totalActivePrizePrice: {
          $sum: "$newRefs.referrer.prizePrice",
        },
      },
    },
    {
      $addFields: {
        totalWithdrawnPrizePrice: {
          $sum: "$withdrawnRefs.referrer.prizePrice",
        },
      },
    },
  ]);

  return result[0];
}
