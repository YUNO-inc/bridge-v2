import { PlusIcon } from "@heroicons/react/16/solid";
import { BusinessI } from "@/app/_lib/actions/business/interfaces";
import LocalIcons from "@/app/_utils/LocalIcons";
import Image from "next/image";

type EdibleItemProps = { business: BusinessI };

function EdibleItem({ business }: EdibleItemProps) {
  return (
    <button className="flex flex-col gap-2 w-full bg-stone-800 bg-opacity-5 rounded-[13px] p-3 text-stone-800">
      <div className="flex items-center justify-between w-full text-sm">
        <div className="relative w-9 h-9 rounded-full overflow-hidden mr-3">
          <Image
            src={`/images/${business.profile}`}
            alt={`${business.name} Profile Image`}
            className="object-cover"
            fill
          />
        </div>
        <div className="grow text-left">
          <div className="text-[15px] font-semibold capitalize overflow-hidden whitespace-nowrap text-ellipsis">
            {business.name}
          </div>
          <div className="space-x-3">
            <span>{business.location}</span>
            <span className="border-r border-r-phthaloGreen border-opacity-40"></span>
            <span className="text-stone-800 text-opacity-60">
              {business.isOpen ? "Open" : "Closed"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="font-semibold">₦{business.deliveryPrice}</div>
          <span className="relative bottom-[1px]">
            <LocalIcons
              name="rider2"
              className="w-[14px] h-[14px] fill-transparent"
              pathClassName={["fill-stone-800", "stroke-stone-800"]}
            />
          </span>
        </div>
      </div>
      {business.recommendations.length && (
        <div className="flex space-x-3 items-center w-full overflow-auto">
          {business.recommendations.map((rec) => (
            <div
              key={rec.name}
              role="button"
              className="bg-stone-800 bg-opacity-10 py-2 px-2 rounded-[7px] flex items-center gap-2 text-sm"
            >
              <div className="relative shrink-0 w-12 h-12 rounded-[4px] overflow-hidden">
                <Image
                  src={`/images/${rec.image}`}
                  fill
                  className="object-cover"
                  alt={`Image of ${rec.name} by ${business.name}`}
                />
                <div className="absolute h-[30%] w-full bg-phthaloGreen bg-opacity-[0.1] backdrop-blur-[1px] z-10 bottom-0 left-0 rounded-b-[4px] flex items-center justify-center border-t-[1px] border-t-phthaloGreen border-opacity-[0.37]">
                  <PlusIcon className="fill-phthaloGreen w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex flex-col justify-between text-left">
                <p className="w-max max-w-[170px] capitalize">{rec.name}</p>
                <p>₦{rec.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </button>
  );
}

export default EdibleItem;
