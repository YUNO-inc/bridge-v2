import { FeedbackDTO } from "@/app/_interfaces/interfaces";
import { Phone, User } from "@phosphor-icons/react/dist/ssr";

function FeedbackItem({ feedback }: { feedback: FeedbackDTO }) {
  const { message, name, phoneNumber } = feedback;

  return (
    <div className="border border-transparent border-opacity-[0.1] border-b-phthaloGreen last:border-b-transparent py-3">
      <p className="flex gap-2 items-center font-bold">
        <span className="max-w-[50%] flex gap-1 items-center">
          <User weight="bold" className="w-5 h-5 shrink-0" />
          <span className="max-w-[90%] overflow-hidden whitespace-nowrap text-ellipsis">
            {name}
          </span>
        </span>
        <span className="max-w-[50%] flex gap-1 items-center">
          <Phone weight="bold" className="w-5 h-5 shrink-0" />
          <span className="max-w-[90%] overflow-hidden whitespace-nowrap text-ellipsis">
            {phoneNumber}
          </span>
        </span>
      </p>
      <p className="pt-1">{message}</p>
    </div>
  );
}

export default FeedbackItem;
