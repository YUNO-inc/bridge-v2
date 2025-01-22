"use client";

import { SignOutAction } from "@/app/_lib/actions/auth/actions";
import { ArrowUpIcon, PlusIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import ActivityControlsSegmentedControl from "../ActivityControlsSegmentedControl";
import { useSession } from "next-auth/react";

function ActivitySearch({
  businessType = "shawarma",
  placeHolder = "What type of shawarma?",
}) {
  const [inny, setInny] = useState(businessType);
  const { data: session } = useSession();
  const cartIsActive = !!inny;
  const orderSelected = !!inny;

  useEffect(
    function () {
      if (inny.length >= 10) SignOutAction();
    },
    [inny.length]
  );

  return (
    <div className="w-full">
      {session === null && <ActivityControlsSegmentedControl />}
      <div className="flex gap-1 justify-end mt-4 bg-phthaloGreen bg-opacity-[0.1] h-30 rounded-[42px] p-[10px] border has-[input:focus]:border-opacity-[0.37] has-[input:focus]:border-phthaloGreen transition-[border-color]">
        <div className="grow flex items-center gap-1 overflow-auto rounded-full">
          <input
            type="text"
            className="grow bg-transparent outline-none h-full px-[6px] rounded-[8px] focus:bor"
            placeholder={placeHolder}
            onChange={(e) => setInny(e.target.value)}
          />
        </div>
        <div className="flex gap-[6px]">
          <button
            title="Add To Cart"
            disabled={!orderSelected}
            className="w-8 h-8 bg-phthaloGreen bg-opacity-[.37] rounded-full flex items-center justify-center disabled:opacity-[0.3] hover:opacity-70 transition-opacity"
          >
            <PlusIcon className="fill-phthaloGreen w-5 h-5" />
          </button>
          <button
            title="Checkout"
            disabled={!cartIsActive}
            className={`w-8 h-8 bg-black rounded-full flex items-center justify-center hover:opacity-70 disabled:opacity-[0.3] transition-opacity`}
          >
            <ArrowUpIcon className="fill-stone-200 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps(ctx) {
//   const session = await auth(ctx);

//   return {
//     props: {
//       session,
//     },
//   };
// }

export default ActivitySearch;
