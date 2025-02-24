import { MagnifyingGlass } from "@phosphor-icons/react";

function SearchComponent({ placeholder = "" }: { placeholder: string }) {
  return (
    <label className="flex items-center gap-2 text-[#ffffff] text-opacity-60 bg-[#787880] bg-opacity-[0.24] py-[7px] px-2 rounded-[10px]">
      <button className="flex items-center justify-center">
        <MagnifyingGlass className="w-5 h-5 fill-current" />
      </button>
      <input
        type="text"
        placeholder={placeholder}
        className="bg-transparent placeholder:text-current placeholder:text-opacity-60 outline-none leading-none"
      />
    </label>
  );
}

export default SearchComponent;
