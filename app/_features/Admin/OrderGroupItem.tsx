import { ItemDTO } from "@/app/_interfaces/interfaces";
import Image from "next/image";

function OrderGroupItem({ item }: { item: ItemDTO }) {
  if (typeof item.businessData !== "string") return null;

  return (
    <div className="flex items-center gap-1 border border-transparent border-opacity-[0.3] border-b-stone-600 last:border-b-transparent py-3">
      <div className="relative bg-phthaloGreen rounded-md bg-opacity-[0.37] shrink-0 h-9 w-9 sm:h-11 sm:w-11 overflow-hidden">
        <Image
          src={`${item.image}`}
          fill
          className="object-cover"
          alt={`Image of ${item.name} by ${item.businessData}`}
        />
      </div>
      <div className="grow max-w-[100%] overflow-hidden text-[14px] sm:text-base flex justify-between items-center">
        <div className="grow flex flex-col max-w-[90%]">
          <div className="grow flex items-center gap-2">
            <p className="max-w-[100%] overflow-hidden whitespace-nowrap text-ellipsis capitalize">
              {item.name}
            </p>
            <span className=" shrink-0 w-1 h-1 bg-stone-600 bg-opacity-55 rounded-full"></span>
            <span className="text-sm whitespace-nowrap">₦{item.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderGroupItem;
