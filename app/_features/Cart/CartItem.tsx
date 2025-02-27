import { ItemDTO } from "@/app/_interfaces/interfaces";
import { ChevronRightIcon, MinusIcon } from "@heroicons/react/16/solid";
import Image from "next/image";

function CartItem({ item }: { item: ItemDTO }) {
  return (
    <div className="flex items-center gap-1 border border-transparent border-opacity-[0.1] border-b-phthaloGreen last:border-b-transparent py-3">
      <div className="relative bg-phthaloGreen rounded-md bg-opacity-[0.37] shrink-0 h-9 w-9 sm:h-11 sm:w-11 overflow-hidden">
        <Image
          src={`/images/${item.image}`}
          fill
          className="object-cover"
          alt={`Image of ${item.name} by ${item.ownerData.name}`}
        />
      </div>
      <div className="grow text-[14px] sm:text-base flex justify-between items-center">
        <div className="grow flex flex-col">
          <div className="grow max-w-40 sw340:max-w-48 sw355:max-w-52 sw370:max-w-56 sw380:max-w-[234px] sw390:max-w-60 sw400:max-w-[250px] sw420:max-w-[280px] sw460:max-w-80 sw550:max-w-none flex items-center gap-2">
            <p className="max-w-[300px] overflow-hidden whitespace-nowrap text-ellipsis capitalize">
              {item.name}
            </p>
            <span className=" shrink-0 w-1 h-1 bg-phthaloGreen bg-opacity-55 rounded-full"></span>
            {/* <span className=" text-[13px] whitespace-nowrap">1 pairing</span> */}
            <span className="text-sm whitespace-nowrap">₦{item.price}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-semibold whitespace-nowrap">
              1 Pairing
            </span>
            {/* <span className="text-sm font-semibold">₦{item.price}</span> */}
            <button className="bg-phthaloGreen bg-opacity-[0.37] rounded-full p-1">
              <ChevronRightIcon className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>
        <button className="bg-app-red bg-opacity-[0.1] rounded-full p-1">
          <MinusIcon className="fill-app-red w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
