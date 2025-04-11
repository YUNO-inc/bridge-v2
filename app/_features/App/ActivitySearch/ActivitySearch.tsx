"use client";

import { useAppSelector } from "@/app/_hooks/reduxHooks";
import { ArrowUpRightIcon, PlusIcon } from "@heroicons/react/16/solid";
import { getCart } from "../../Cart/cartSlice";
import { useRouter } from "next/navigation";

function ActivitySearch({
  placeHolder = "What type of shawarma?",
}: {
  placeHolder?: string;
}) {
  const router = useRouter();
  const { numTotalItems } = useAppSelector(getCart);

  function handleSearchStrChange(newValue: string) {
    router.push(`?search=${encodeURIComponent(newValue)}`);
  }

  return (
    <div className="w-full flex gap-1 justify-end mt-4 bg-phthaloGreen bg-opacity-[0.1] h-30 rounded-[42px] p-[10px] border has-[input:focus]:border-opacity-[0.37] has-[input:focus]:border-phthaloGreen transition-[border-color]">
      <div className="grow flex items-center gap-1 overflow-auto rounded-full">
        <input
          type="text"
          className="grow bg-transparent outline-none h-full px-[6px] rounded-[8px] focus:bor"
          placeholder={placeHolder}
          onChange={(e) => handleSearchStrChange(e.target.value)}
        />
      </div>
      <div className="flex gap-[6px]">
        <button
          title="Add To Cart"
          disabled={true}
          className="w-8 h-8 bg-phthaloGreen bg-opacity-[.37] rounded-full flex items-center justify-center disabled:opacity-[0.3] hover:opacity-70 transition-opacity"
        >
          <PlusIcon className="fill-phthaloGreen w-5 h-5" />
        </button>
        <button
          title="Checkout"
          disabled={!numTotalItems}
          className={`w-8 h-8 bg-black rounded-full flex items-center justify-center hover:opacity-70 disabled:opacity-[0.3] transition-opacity`}
        >
          <ArrowUpRightIcon className="fill-stone-200 w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default ActivitySearch;
