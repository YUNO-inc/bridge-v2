import FeedbackItem from "@/app/_features/Admin/FeedbackItem";
import PageBackLink from "@/app/_features/Button/PageBackLink";
import { getFeedbacks } from "@/app/_lib/feedback/service";
import LocalIcons from "@/app/_utils/LocalIcons";

async function Page() {
  const feedbacks = await getFeedbacks();
  const hasFeedbacks = feedbacks.length > 0;
  return (
    <div className="flex flex-col min-h-[100svh] py-4 text-xl">
      <PageBackLink href="/admin" text="Back To Admin" className="mb-10" />
      <div className="grow flex flex-col items-center">
        <div className="grow flex flex-col gap-3 w-full max-w-screen-sm px-4 items-center justify-between">
          <div className="grow flex flex-col  min-h-14 w-full bg-phthaloGreen/10 rounded-2xl p-3">
            <p className="text-phthaloGreen text-xl font-extrabold">
              Feedbacks {hasFeedbacks ? `x ${feedbacks.length}` : ""}
            </p>
            {hasFeedbacks ? (
              <div className="overflow-y-auto text-sm text-stone-500 flex flex-col bg-white bg-opacity-[0.74] rounded-[18px] px-3">
                {feedbacks.map((feedback) => (
                  <FeedbackItem key={feedback.id} feedback={feedback} />
                ))}
              </div>
            ) : (
              <div className="grow flex flex-col items-center justify-center">
                <LocalIcons name="empty-chat" />
                <p className="text-sm font-bold text-center text-phthaloGreen text-opacity-[0.37]">
                  No Feedbacks
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
