import LocalIcons from "@/app/_utils/LocalIcons";
import CartItem from "./CartItem";
import IconAndText from "./IconAndText";
import { MoneyWavy } from "@phosphor-icons/react";
import { CartGroupDTO } from "@/app/_interfaces/interfaces";

function CartGroup({ group }: { group: CartGroupDTO }) {
  const { name, items, totalPrice, deliveryPrice } = group;
  return (
    <div className="flex flex-col gap-1 pt-4">
      <div className="flex items-center gap-3 px-3">
        <p className="font-semibold">{name}</p>
        <span className="bg-phthaloGreen bg-opacity-[0.37] leading-none py-1 px-2 rounded-full capitalize text-xs font-semibold">
          farthest purchase
        </span>
      </div>
      <div className="flex flex-col bg-white bg-opacity-30 rounded-[18px] px-3">
        {items.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
        <div className="py-3 flex items-center gap-6">
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
            text={`₦${deliveryPrice}`}
          />
          <IconAndText
            icon={<MoneyWavy className="w-3.5 h-3.5 fill-phthaloGreen" />}
            text={`₦${totalPrice}`}
          />
        </div>
      </div>
    </div>
  );
}

export default CartGroup;
