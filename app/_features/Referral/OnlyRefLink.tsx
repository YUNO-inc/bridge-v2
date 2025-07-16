"use client";

import { copyToClipboard } from "@/app/_utils/copyToClipboard";

function OnlyRefLink({ url }: { url: string }) {
  return (
    <button
      className="active:underline transition pt-1 relative -bottom-2 text-phthaloGreen text-opacity-[0.37]"
      onClick={() => copyToClipboard(url)}
    >
      {url}
    </button>
  );
}

export default OnlyRefLink;
