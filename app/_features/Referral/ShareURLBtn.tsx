"use client";

import { shareURL } from "@/app/_utils/shareURL";
import { LinkSimple } from "@phosphor-icons/react";

function ShareURLBtn({ origin }: { origin: string }) {
  async function handleClick() {
    await shareURL({
      title: "BridgeInc Invite",
      text: "Canal Estate's delivery service.",
      url: origin,
    });
  }

  return (
    <button
      className="flex gap-1 flex-col items-center bg-white b-opacity-[0.37] rounded-[16px] py-2 px-4 max-w-28 hover:bg-phthaloGreen hover:text-white active:bg-phthaloGreen active:text-phthaloGreen active:bg-opacity-10"
      onClick={handleClick}
    >
      <p>Tap to share URL</p>
      <LinkSimple className="w-7 h-7" />
    </button>
  );
}

export default ShareURLBtn;
