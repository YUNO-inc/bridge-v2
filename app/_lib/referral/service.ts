import { auth } from "../auth/auth";
import User from "../user/model";

export async function getMyRefData() {
  const session = await auth();
  const user = session?.user;

  if (!user?.id)
    throw new Error("Only logged in users can check their referral data.");

  await User.aggregate();
}
