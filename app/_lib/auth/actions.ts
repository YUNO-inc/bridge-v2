"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { auth, signIn, signOut } from "./auth";
import { updateUserById } from "../user/service";

export async function SignInAction(formData: FormData) {
  const referrerId = formData.get("referrerId") as string;

  const cookieStore = await cookies();
  cookieStore.set("referrerId", referrerId || "null");
  console.log("cookieStore: ", referrerId);

  await signIn(
    "google",
    {
      redirectTo: "/auth/hey-number",
      referrerId,
    },
    { ref: "pro--322" }
  );
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
