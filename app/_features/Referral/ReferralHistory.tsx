"use client";

import { UserDTO } from "@/app/_interfaces/interfaces";
import { formatDate, formatNumberToCurrency } from "@/app/_utils/helpers";
import { CaretDown } from "@phosphor-icons/react";
import { useState } from "react";

function ReferralHistory({
  totalEarnPrizePrice,
  refPageVisits,
  allReferrals,
}: {
  totalEarnPrizePrice: number;
  refPageVisits: number | string;
  allReferrals: Pick<UserDTO, "id" | "createdAt" | "referrer">[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-phthaloGreen bg-opacity-10 text-left font-semibold text-phthaloGreen rounded-[16px] px-4 text-sm">
      <button
        className={`py-4 w-full flex items-center justify-between transition border border-b-phthaloGreen ${
          isOpen ? "border-opacity-10" : "border-opacity-0"
        }`}
        onClick={() => setIsOpen((i) => !i)}
      >
        <span>Referral history</span>
        <CaretDown
          weight="bold"
          className={`w-5 transition ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>
      <div
        className={`flex flex-col gap-4 overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          isOpen ? "py-4 max-h-80" : "py-0 max-h-0"
        }`}
      >
        <div className="flex bg-white p-4 rounded-[16px]">
          <div className="basis-[50%] flex flex-col gap-2">
            <p className="text-phthaloGreen text-opacity-[0.37]">
              Total Earned
            </p>
            <p className="font-bold">
              {formatNumberToCurrency(totalEarnPrizePrice)}
            </p>
          </div>
          <div className="basis-[50%] flex flex-col gap-2">
            <p className="text-phthaloGreen text-opacity-[0.37]">
              Total Link Uses
            </p>
            <p className="font-bold">{refPageVisits}</p>
          </div>
        </div>
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
    </div>
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
