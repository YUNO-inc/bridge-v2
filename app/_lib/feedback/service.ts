"use server";

import { auth } from "../auth/auth";
import Feedback from "./model";

export async function submitFeedback(message: string) {
  const session = await auth();
  const user = session?.user;

  if (process.env.NODE_ENV !== "development") {
    await fetch("https://ntfy.sh/bridge-order-alert", {
      method: "POST",
      headers: {
        Title: "New Feedback",
        Priority: "urgent",
        Tags: "loud_sound",
        Click: `https://bridgeinc.ng/admin`,
      },
      body: `NEW FEEDBACK -- ${message}`,
    });
  }

  await Feedback.create({
    user: user?.id,
    name: user?.name,
    phoneNumber: user?.phoneNumber,
    message,
  });
}
