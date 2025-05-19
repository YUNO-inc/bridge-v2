import { MoneyWavy } from "@phosphor-icons/react";
import IconAndText from "../Cart/IconAndText";
import { CartGroupDTO } from "@/app/_interfaces/interfaces";
import OrderGroupItem from "./OrderGroupItem";

function OrderGroup({
  group,
  farthestPurchase,
}: {
  group: Partial<CartGroupDTO> | undefined;
  farthestPurchase: string;
}) {
  if (!group) return null;

  const { name, items = [], totalPrice } = group;
  const isFarthestPurchase = farthestPurchase === group.id;

  return (
    <div className="flex flex-col gap-1 pt-4 text-stone-300 max-w-[calc(100vw-40px)]">
      <div className="flex items-center gap-3 px-3 max-w-[100%] overflow-hidden whitespace-nowrap text-ellipsis">
        <p
          className={`font-semibold ${
            isFarthestPurchase ? "max-w-[70%]" : "max-w-[100%]"
          } overflow-hidden whitespace-nowrap text-ellipsis`}
        >
          {name}
        </p>
        {isFarthestPurchase && (
          <span className="whitespace-nowrap bg-stone-600 bg-opacity-[0.37] leading-none py-1 px-2 rounded-full capitalize text-xs font-semibold">
            farthest purchase
          </span>
        )}
      </div>
      <div className="flex flex-col bg-stone-600 bg-opacity-[0.37] max-w-[100%] rounded-[18px] px-3">
        {items.map((item, i) => (
          <OrderGroupItem item={item} key={`${item.createdAt}-${i}`} />
        ))}
        <div className="py-3 flex items-center gap-6">
          <IconAndText
            icon={<MoneyWavy className="w-3.5 h-3.5 fill-phthaloGreen" />}
            text={`₦${totalPrice}`}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderGroup;
