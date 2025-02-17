import { MagnifyingGlass } from "@phosphor-icons/react";

function FlexibleModal() {
  return (
    <div className="h-[40svh] absolute bg-black-100 z-[9999] bottom-0 right-0 rounded-t-2xl w-svw sm:h-svh sm:w-auto  sm:rounded-l-2xl sm:rounded-r-none">
      <div className="flex flex-col items-center p-3">
        <SearchComponent placeholder="Search places" />
      </div>
    </div>
  );
}

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

export default FlexibleModal;
