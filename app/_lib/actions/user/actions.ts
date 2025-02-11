"use server";

import { cleanObject } from "@/app/_utils/helpers";
import { updateMe } from "./service";
import { UserDTO } from "@/app/_interfaces/interfaces";

export async function UpdateMeAction(
  formdata: FormData
): Promise<Partial<UserDTO>> {
  const name = formdata.get("name");
  const email = formdata.get("email");
  const phoneNumber = formdata.get("phoneNumber");
  const updateObject = cleanObject({ name, email, phoneNumber });

  if (Object.keys(updateObject).length < 1)
    throw new Error("No valid updates where sent.");

  try {
    const user = await updateMe(updateObject);
    return {
      name: user?.name,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
    };
  } catch (error: unknown) {
    const err = error as Error;
    throw new Error(err.message || "Failed to update user.");
  }
}
