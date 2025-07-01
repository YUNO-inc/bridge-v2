"use server";

import { getADMIN_IDS } from "@/app/_utils/helpers";
import { auth } from "../auth/auth";
import Feedback from "./model";
import { FeedbackDTO } from "@/app/_interfaces/interfaces";

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

export async function getFeedbacks(): Promise<FeedbackDTO[]> {
  const session = await auth();
  const user = session?.user;
  const ADMIN_IDS = getADMIN_IDS();

  if (process.env.NODE_ENV !== "development") {
    if (!user || !ADMIN_IDS.includes(user.id || ""))
      throw new Error("Unathorised access");
  }

  const feedbacks = await Feedback.find({ seen: false });
  return feedbacks;
}
