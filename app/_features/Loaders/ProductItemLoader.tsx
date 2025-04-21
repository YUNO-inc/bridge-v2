function ProductItemLoader() {
  return (
    <div className="flex items-center gap-2 border-b-[0.1px] border-b-phthaloGreen border-opacity-[0.1] py-3 mr-2 first:pt-0">
      <div className="bg-stone-800 bg-opacity-10 shrink-0 w-12 h-12 rounded-[13.333%] animate-pulse"></div>
      <div className="grow max-w-[80%] flex flex-col justify-between self-stretch animate-pulse">
        <div className="max-w-[230px] w-60% bg-stone-800 bg-opacity-10 h-6"></div>
        <p className="flex items-center gap-2">
          <span className="h-5 w-10 bg-stone-800 bg-opacity-10"></span>
          <span className=" shrink-0 w-1 h-1 bg-phthaloGreen bg-opacity-10 rounded-full"></span>
          <span className="h-4 w-5 bg-stone-800 bg-opacity-10"></span>
        </p>
      </div>
    </div>
  );
}

export default ProductItemLoader;
