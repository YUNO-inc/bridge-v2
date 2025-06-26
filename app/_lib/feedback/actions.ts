import { submitFeedback } from "./service";

export async function SubmitFeedbackAction(feedbackmsg: string) {
  submitFeedback(feedbackmsg);
}
