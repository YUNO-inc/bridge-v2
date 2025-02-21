function PopupLoader() {
  return (
    <div className="bg-background flex items-center justify-between rounded-xl p-2 gap-2 max-w-[90vw]">
      <div className="w-52 h-10 animate-[pulse_1s_ease-in-out_infinite] duration-1000 flex items-center justify-between gap-3">
        <div className="bg-stone-800 bg-opacity-10 rounded w-5 h-5"></div>
        <div className="grow flex flex-col gap-1">
          <div className="bg-stone-800 bg-opacity-10 rounded w-[90%] h-3"></div>
          <div className="bg-stone-800 bg-opacity-10 rounded w-[50%] h-2"></div>
        </div>
        <div className="bg-stone-800 bg-opacity-10 rounded w-5 h-5"></div>
      </div>
    </div>
  );
}

export default PopupLoader;
