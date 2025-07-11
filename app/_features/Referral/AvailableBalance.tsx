"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

function AvailableBalance() {
  const refBalStateName: string | null = "referral-balance-is-visible";
  const [balanceIsVisible, setBalanceIsVisible] = useState(false);

  useEffect(() => {
    const localBalanceIsVisibleState = JSON.parse(
      localStorage.getItem(refBalStateName) || "true"
    );
    setBalanceIsVisible(localBalanceIsVisibleState);
  }, []);

  return (
    <div className="bg-phthaloGreen bg-opacity-10 w-full text-phthaloGreen px-4 rounded-[16px] text-sm border border-phthaloGreen border-opacity-[0.37]">
      <button
        className="flex items-center gap-3 pt-4"
        onClick={() => {
          setBalanceIsVisible((b) => !b);
          localStorage.setItem(refBalStateName, `${!balanceIsVisible}`);
        }}
      >
        <span>Available Balance</span>
        {balanceIsVisible ? (
          <EyeIcon className="w-4 h-4" />
        ) : (
          <EyeSlashIcon className="w-4 h-4" />
        )}
      </button>
      <div className="text-2xl font-bold pt-2 pb-4">
        {balanceIsVisible ? <span>₦3,000.00</span> : <span>******</span>}
      </div>
    </div>
  );
}

export default AvailableBalance;
