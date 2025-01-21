"use client";

import { ArrowUpIcon, PlusIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

function ActivitySearch({
  businessType = "shawarma",
  placeHolder = "What type of shawarma?",
}) {
  const [inny, setInny] = useState(businessType);
  const cartIsActive = !!inny;
  const orderSelected = !!inny;

  return (
    <div className="flex gap-1 justify-end mt-4 bg-phthaloGreen bg-opacity-[0.1] w-full h-30 rounded-[42px] p-[10px]">
      <div className=" grow flex items-center gap-1 overflow-auto rounded-full">
        <input
          type="text"
          className="bg-transparent outline-none h-full px-[6px] rounded-[8px]"
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
  );
}

export default ActivitySearch;
