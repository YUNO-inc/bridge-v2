"use client";

import { UserDTO } from "@/app/_interfaces/interfaces";
import { formatDate, formatNumberToCurrency } from "@/app/_utils/helpers";
import Accordion from "../Accordion/Accordion";
import TwoDataTabs from "../Accordion/TwoDataTabs";

function ReferralHistory({
  totalEarnPrizePrice,
  refPageVisits,
  allReferrals,
}: {
  totalEarnPrizePrice: number;
  refPageVisits: number | string;
  allReferrals: Pick<UserDTO, "id" | "createdAt" | "referrer">[];
}) {
  return (
    <Accordion
      btnContent={<span>Referral history</span>}
      expandContent={
        <div className="flex flex-col gap-4 max-h-full">
          <TwoDataTabs
            tabs={[
              {
                title: "Total Earned",
                value: formatNumberToCurrency(totalEarnPrizePrice),
              },
              {
                title: "Total Link Uses",
                value: String(refPageVisits),
              },
            ]}
          />
          {allReferrals.length > 0 ? (
            <div className="flex flex-col bg-white p-4 rounded-[16px]">
              {allReferrals.map((ref) => (
                <ReferralHistoryItem ref={ref} key={ref.id} />
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      }
      btnClassName="py-4 flex items-center justify-between"
      contentActiveClassName="py-4 opacity-100"
      contentInactiveClassName="py-0 opacity-0"
    />
  );
}

function ReferralHistoryItem({
  ref,
}: {
  ref: Pick<UserDTO, "id" | "createdAt" | "referrer">;
}) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-b-phthaloGreen border-opacity-10 first:pt-0 last:pb-0 last:border-none">
      <span>{formatDate(new Date(ref.createdAt))}</span>
      <button
        className={`text-white px-1.5 py-0.5 rounded-full shadow-sgc text-xs md:text-sm ${
          ref.referrer?.prizeWithdrawn ? "bg-pink-500/80" : "bg-blue-800/80"
        }`}
      >
        {ref.referrer?.prizeWithdrawn ? "Withdrawn" : "Available"}{" "}
        {formatNumberToCurrency(ref.referrer?.prizePrice || NaN)}
      </button>
    </div>
  );
}

export default ReferralHistory;
