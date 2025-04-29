import { ItemDTO } from "@/app/_interfaces/interfaces";
import Image from "next/image";

function pair({ pair }: { pair: ItemDTO }) {
  const isSelected = pair.id === "23232";

  return (
    <button
      className={`overflow-hidden rounded-md w-20 h-20 bg-phthaloGreen bg-opacity-10 shadow-sgc transition-all border-phthaloGreen border-opacity-[0.37] flex flex-col items-center ${
        isSelected ? "border" : "border-none"
      }`}
    >
      <div
        className={`relative overflow-hidden w-full h-14 border-phthaloGreen border-opacity-0 ${
          isSelected ? "border-[1px] rounded-md" : "border-none"
        }`}
      >
        <Image
          fill
          className="object-cover"
          src={pair.image}
          alt={`Image of ${pair.name} by ${
            typeof pair.businessData === "string"
              ? "a business"
              : pair.businessData.name
          }`}
        />
        <p className="absolute top-1 right-1 bg-white z-10 text-[10px] rounded-full px-1 flex items-center justify-center leading-none text-phthaloGreen-700">
          <span className="relative bottom-[-1px]">
            {`₦`}
            {pair.price}
          </span>
        </p>
      </div>
      <div className="grow flex items-center justify-center max-w-full">
        <p className="capitalize mx-[2px] text-center text-xs text-nowrap overflow-hidden text-ellipsis text-phthaloGreen max-w-[calc(100%-4px)]">
          {pair.name}
        </p>
      </div>
    </button>
  );
}

export default pair;
