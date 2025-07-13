"use client";

import { LinkSimple } from "@phosphor-icons/react";
import { toast } from "sonner";

function ShareURLBtn({ origin }: { origin: string }) {
  async function handleClick() {
    try {
      await navigator.share?.({
        title: "BridgeInc Invite ererer",
        text: "Canal Estate's delivery service.",
        url: origin,
      });
    } catch {
      try {
        await navigator.clipboard.writeText(origin);
        toast.success("URL copied to clipboard ✅🔗");
      } catch {
        toast.error(
          "Unable to share or copy the link. Please copy it by selecting the link below."
        );
      }
    }
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
