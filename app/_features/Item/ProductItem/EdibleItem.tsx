import { ItemDTO } from "@/app/_interfaces/interfaces";
import ItemImage from "../ItemImage";
import IconAndText from "../../Cart/IconAndText";
import LocalIcons from "@/app/_utils/LocalIcons";
import { MoneyWavy } from "@phosphor-icons/react";

function EdibleItem({ item }: { item: ItemDTO }) {
  return (
    <div className="flex items-center gap-2 border-b-[0.1px] border-b-phthaloGreen border-opacity-[0.1] py-3 pr-2 first:pt-0">
      <ItemImage item={item} />
      <div className="grow flex flex-col justify-between self-stretch">
        <p className="capitalize font-semibold">
          <span>{item.name}</span>
          <span className="w-1 h-1 bg-phthaloGreen-50 bg-opacity-55 rounded-full"></span>
          <span>{`₦${item.ownerData.deliveryPrice}`}</span>
        </p>
        <p className="text-stone-800 text-opacity-[0.37]">
          <span>{item.ownerData.name}</span>
          <span className="w-1 h-1 bg-phthaloGreen-50 bg-opacity-55 rounded-full"></span>
          <span>{`₦${item.ownerData.deliveryPrice}`}</span>
        </p>
      </div>
      <div className="self-stretch flex flex-col justify-between">
        <IconAndText
          icon={<MoneyWavy className="w-3.5 h-3.5 fill-phthaloGreen" />}
          text={`₦${item.price}`}
        />
        <IconAndText
          icon={
            <LocalIcons
              name="rider"
              className="w-3 h-3 fill-transparent"
              pathClassName={[
                "fill-phthaloGreen fill-opacity-[0.3] ",
                "stroke-phthaloGreen stroke-opacity-[0.3] ",
              ]}
            />
          }
          text={`₦${item.ownerData.deliveryPrice}`}
        />
      </div>
    </div>
  );
}

export default EdibleItem;











