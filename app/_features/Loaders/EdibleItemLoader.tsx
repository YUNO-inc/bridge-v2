function EdibleItemLoader() {
  return (
    <div className="flex flex-col gap-2 w-full bg-stone-800 bg-opacity-5 rounded-[13px] p-3 text-stone-800 animate-pulse">
      <div className="flex items-center justify-between w-full text-sm">
        <div className="relative w-9 h-9 rounded-full overflow-hidden mr-3 bg-black/10"></div>
        <div className="grow text-left">
          <div className="text-[15px] font-semibold capitalize overflow-hidden whitespace-nowrap text-ellipsis w-40 h-5 bg-black/10"></div>
          <div className="space-x-3 flex mt-1">
            <div className="w-24 h-4 bg-black/10"></div>
            <span className="border-r border-r-phthaloGreen/10 border-opacity-40"></span>
            <div className="text-stone-800 text-opacity-60 w-16 h-4 bg-black/10"></div>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-black/10 w-10 h-5"></div>
      </div>
      <div className="flex space-x-3 items-center w-full overflow-auto">
        <div className="bg-stone-800 bg-opacity-10 py-2 px-2 rounded-[7px] flex items-center gap-2 text-sm w-56">
          <div className="shrink-0 w-12 h-12 rounded-[13.333%]"></div>
        </div>
        <div className="bg-stone-800 bg-opacity-10 py-2 px-2 rounded-[7px] flex items-center gap-2 text-sm w-56">
          <div className="shrink-0 w-12 h-12 rounded-[13.333%]"></div>
        </div>
      </div>
    </div>
  );
}

export default EdibleItemLoader;
