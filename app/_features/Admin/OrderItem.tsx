import Link from "next/link";
import { MapPin, MoneyWavy, Package } from "@phosphor-icons/react/dist/ssr";
import IconAndText from "../Cart/IconAndText";
import LocalIcons from "@/app/_utils/LocalIcons";
import { AdminAggregatesActiveOrderDTO } from "@/app/_interfaces/interfaces";

function OrderItem({ order }: { order: AdminAggregatesActiveOrderDTO }) {
  const {
    id,
    items,
    businesses,
    farthestPurchase,
    user,
    totalDeliveryPrice,
    totalItemPrice,
  } = order;
  const hasMoreThanOneItem = items.length > 1;
  const hasMoreThanOneBusiness = businesses.length > 1;
  const selectedAddress = user.addresses?.find?.((a) => a.isSelected);

  return (
    <Link
      href={`/admin/order/${id}`}
      className="border border-transparent border-opacity-[0.1] border-b-phthaloGreen last:border-b-transparent py-3"
    >
      <p>
        <span className="font-bold">{items.length}</span>{" "}
        <span>{hasMoreThanOneItem ? "items" : "item"}</span> {"from "}
        <span className="font-bold">{businesses.length}</span>{" "}
        <span>{hasMoreThanOneBusiness ? "businesses" : "business"}</span>
      </p>
      <p className="flex gap-2 items-center font-bold">
        <span className="max-w-[50%] flex gap-1 items-center">
          <Package className="w-5 h-5 shrink-0" />
          <span className="max-w-[90%] overflow-hidden whitespace-nowrap text-ellipsis">
            {farthestPurchase.name}
          </span>
        </span>
        <span className="max-w-[50%] flex gap-1 items-center">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="max-w-[90%] overflow-hidden whitespace-nowrap text-ellipsis">
            {selectedAddress?.name}
          </span>
        </span>
      </p>
      <div className="text-stone-600 pt-3 flex items-center gap-6">
        <IconAndText
          icon={
            <LocalIcons
              name="rider"
              className="w-3 h-3 fill-transparent"
              pathClassName={[
                "fill-current fill-opacity-[0.3] ",
                "stroke-current stroke-opacity-[0.3] ",
              ]}
            />
          }
          text={`₦${totalDeliveryPrice}`}
        />
        <IconAndText
          icon={<MoneyWavy className="w-3.5 h-3.5 fill-current" />}
          text={`₦${totalItemPrice}`}
        />
      </div>
    </Link>
  );
}

export default OrderItem;
