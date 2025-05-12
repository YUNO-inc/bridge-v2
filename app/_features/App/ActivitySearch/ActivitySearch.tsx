"use client";

// import { PlusIcon } from "@heroicons/react/16/solid";
import CheckoutBtn from "./CheckoutBtn";
import SearchInput from "./SearchInput";

function ActivitySearch() {
  return (
    <div className="w-full flex gap-1 justify-end mt-4 bg-phthaloGreen bg-opacity-[0.1] h-30 rounded-[42px] p-[10px] border has-[input:focus]:border-opacity-[0.37] has-[input:focus]:border-phthaloGreen transition-[border-color]">
      <div className="grow flex items-center gap-1 overflow-auto rounded-full">
        <SearchInput />
      </div>
      <div className="flex gap-[6px]">
        {/* <button
          title="Add To Cart"
          disabled={true}
          className="w-8 h-8 bg-phthaloGreen bg-opacity-[.37] rounded-full flex items-center justify-center disabled:opacity-[0.3] hover:opacity-70 transition-opacity"
        >
          <PlusIcon className="fill-phthaloGreen w-5 h-5" />
        </button> */}
        <CheckoutBtn />
      </div>
    </div>
  );
}

export default ActivitySearch;
