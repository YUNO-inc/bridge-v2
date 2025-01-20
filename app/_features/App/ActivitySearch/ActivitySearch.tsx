function ActivitySearch() {
  return (
    <div className="flex gap-1 justify-end mt-4 bg-phthaloGreen bg-opacity-[0.1] w-full h-30 rounded-[42px] p-[10px]">
      <div className=" grow bg-phthaloGreen bg-opacity-[0.1] flex items-center">
        <input className="outline-none w-full bg-transparent" />
      </div>
      <div className="flex gap-[6px]">
        <div className="w-8 h-8 bg-black bg-opacity-[0.1] rounded-full"></div>
        <div className="w-8 h-8 bg-black rounded-full"></div>
      </div>
    </div>
  );
}

export default ActivitySearch;
