import CartItem from "./CartItem";
import IconAndText from "./IconAndText";
import { MoneyWavy } from "@phosphor-icons/react";
import { CartGroupDTO } from "@/app/_interfaces/interfaces";
import CartGroupDeliveryPrice from "./CartGroupDeliveryPrice";
import { useAppSelector } from "@/app/_hooks/reduxHooks";
import { getCart } from "./cartSlice";

function CartGroup({ group }: { group: CartGroupDTO }) {
  const { name, items, totalPrice, deliveryPrice, address } = group;
  const { farthestPurchase } = useAppSelector(getCart);
  return (
    <div className="flex flex-col gap-1 pt-4">
      <div className="flex items-center gap-3 px-3 max-w-[100%] overflow-hidden whitespace-nowrap text-ellipsis">
        <p className="font-semibold max-w-[100%] overflow-hidden whitespace-nowrap text-ellipsis">
          {name}
        </p>
        {farthestPurchase?.id === group.address.id && (
          <span className="whitespace-nowrap bg-phthaloGreen bg-opacity-[0.37] leading-none py-1 px-2 rounded-full capitalize text-xs font-semibold">
            farthest purchase
          </span>
        )}
      </div>
      <div className="flex flex-col bg-white bg-opacity-[0.37] rounded-[18px] px-3">
        {items.map((item) => (
          <CartItem
            item={item}
            key={
              typeof item.createdAt === "number"
                ? item.createdAt
                : item.createdAt.getTime()
            }
          />
        ))}
        <div className="py-3 flex items-center gap-6">
          <CartGroupDeliveryPrice
            deliveryPrice={deliveryPrice}
            pickupPoint={address.coordinates}
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
