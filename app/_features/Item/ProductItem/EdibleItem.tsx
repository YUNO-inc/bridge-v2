import { ItemDTO } from "@/app/_interfaces/interfaces";
import ItemImage from "../ItemImage";
import LocalIcons from "@/app/_utils/LocalIcons";

function EdibleItem({ item }: { item: ItemDTO }) {
  return (
    <div className="flex items-center gap-2 border-b-[0.1px] border-b-phthaloGreen border-opacity-[0.1] py-3 mr-2 first:pt-0">
      <ItemImage item={item} />
      <div className="grow max-w-[80%] flex flex-col justify-between self-stretch">
        <div className="flex max-h-full items-center gap-2 capitalize font-semibold">
          <span className="max-w-[70%] overflow-hidden whitespace-nowrap text-ellipsis capitalize">
            {item.name}
          </span>
          <span className=" shrink-0 w-1 h-1 bg-phthaloGreen bg-opacity-55 rounded-full"></span>
          <p className="text-sm font-semibold">₦{item.price}</p>
        </div>
        <p className="flex items-center gap-2 text-stone-800 text-opacity-[0.37]">
          <span>{item.ownerData.name}</span>
          <span className=" shrink-0 w-1 h-1 bg-phthaloGreen bg-opacity-55 rounded-full"></span>
          <span className="flex items-center text-xs font-semibold gap-1">
            <>₦{item.ownerData.deliveryPrice}</>
            <LocalIcons
              name="rider"
              className="relative -top-[1px] w-3 h-3 fill-transparent"
              pathClassName={[
                "fill-current fill-opacity-[0.3] ",
                "stroke-current stroke-opacity-[0.3] ",
              ]}
            />
          </span>
        </p>
      </div>
    </div>
  );
}

export default EdibleItem;
