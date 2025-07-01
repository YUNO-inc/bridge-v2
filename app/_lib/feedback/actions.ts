import { getFeedbacks, submitFeedback } from "./service";

export async function SubmitFeedbackAction(feedbackmsg: string) {
  submitFeedback(feedbackmsg);
}

export async function GetFeedbacksAction() {
  const feedbacks = await getFeedbacks();
  return feedbacks;
}
