"use client";
import { useState } from "react";
import Button from "./Button";
import { SubmitFeedbackAction } from "@/app/_lib/feedback/actions";

function FeedBackForm() {
  const [feedbackmsg, setFeedbackmsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <form
      className="max-w-[800px] w-full mx-auto"
      onSubmit={async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
          await SubmitFeedbackAction(feedbackmsg);
          setFeedbackmsg("");
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      <textarea
        name="textarea"
        id=""
        placeholder="Write your feedbacks or bug report here"
        className="w-full h-[300px] outline-none bg-phthaloGreen bg-opacity-[0.1] p-3 rounded-xl border border-phthaloGreen border-opacity-[0.10] focus:border-opacity-[0.37] transition-all"
        value={feedbackmsg}
        onChange={(e) => setFeedbackmsg(e.target.value)}
      ></textarea>
      {feedbackmsg.length > 0 ? (
        <Button
          text="submit"
          className="mt-2"
          type="submit"
          isLoading={isSubmitting}
        />
      ) : (
        ""
      )}
    </form>
  );
}

export default FeedBackForm;
