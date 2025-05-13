"use server";

import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { updateUserById } from "../user/service";

export async function SignInAction() {
  await signIn("google", { redirectTo: "/auth/hey-number" });
}

export async function SignOutAction() {
  await signOut({ redirectTo: "/auth" });
}

export async function SignedInNumberSubmitAction(formdata: FormData) {
  try {
    const phoneNumber = formdata.get("phoneNumber")?.toString();
    const session = await auth();
    const user = session?.user;

    if (!phoneNumber || phoneNumber.length < 10 || phoneNumber.length > 11)
      throw new Error("Phone Number is Invalid");
    if (!user?.id) throw new Error("User Not Found");

    await updateUserById(user?.id, { phoneNumber });
  } finally {
    redirect("/");
  }
}
