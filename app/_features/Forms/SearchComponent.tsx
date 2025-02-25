"use client";

import { MagnifyingGlass, XCircle } from "@phosphor-icons/react";
import { motion } from "motion/react";

function SearchComponent({
  placeholder = "",
  searchText,
  isClearable = true,
  onChange,
  onClear,
  onFocus,
}: {
  placeholder: string;
  searchText: string;
  isClearable?: boolean;
  onChange?: (text: string) => void;
  onClear?: () => void;
  onFocus?: () => void;
}) {
  return (
    <label className="flex justify-between items-center gap-2 text-[#ffffff] text-opacity-60 bg-[#787880] bg-opacity-[0.24] py-[7px] px-2 rounded-[10px]">
      <button className="flex items-center justify-center">
        <MagnifyingGlass className="w-5 h-5 fill-current" />
      </button>
      <motion.input
        type="text"
        placeholder={placeholder}
        className="grow bg-transparent placeholder:text-current placeholder:text-opacity-60 outline-none leading-none"
        value={searchText}
        onChange={(e) => {
          if (onChange) onChange(e.target.value);
        }}
        onFocus={() => {
          if (onFocus) onFocus();
        }}
        // initial={{ width: "auto" }}
        // whileFocus={{ width: "16rem" }}
        // transition={{ type: "spring", stiffness: 200, damping: 15 }}
      />
      {isClearable && (
        <button
          onClick={() => {
            if (onClear) onClear();
          }}
        >
          <XCircle weight="fill" className="w-5 h-5" />
        </button>
      )}
    </label>
  );
}

export default SearchComponent;
