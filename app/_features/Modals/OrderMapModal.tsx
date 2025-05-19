"use client";

import {
  BusinessAddressDTO,
  CartGroupDTO,
  ItemDTO,
  NarrowOrderDTO,
} from "@/app/_interfaces/interfaces";
import FlexibleModal from "./FlexibleModal";
import { MapPin } from "@phosphor-icons/react";
import OrderGroup from "../Admin/OrderGroup";
import { sortByFarthestPoint } from "@/app/_utils/helpers";
import DeliveredBtn from "./DeliveredBtn";

function OrderMapModal({
  className,
  order,
}: {
  className: string;
  order: NarrowOrderDTO;
}) {
  const {
    id: orderId,
    user,
    items,
    businesses,
    farthestPurchase: farthestPurchaseId,
    totalDeliveryPrice,
    totalItemPrice,
  } = order;
  const hasMoreThanOneItem = items.length > 1;
  const hasMoreThanOneBusiness = businesses.length > 1;
  const selectedAddress = user?.addresses?.find?.((a) => a.isSelected);

  const { groups, pickupAddresses } = businesses.reduce<{
    groups: Partial<CartGroupDTO>[];
    pickupAddresses: BusinessAddressDTO[];
  }>(
    (acc, biz) => {
      const { name, address } = biz;

      const { totalPrice, bizItems } = items.reduce<{
        totalPrice: number;
        bizItems: ItemDTO[];
      }>(
        (acc, i) => {
          if (i.businessData !== biz.id) return acc;
          acc.totalPrice += i.price;
          acc.bizItems.push(i);
          return acc;
        },
        { totalPrice: 0, bizItems: [] }
      );

      const group = { id: biz.id, name, address, totalPrice, items: bizItems };
      acc.groups.push(group);
      acc.pickupAddresses.push(address);
      return acc;
    },
    { groups: [], pickupAddresses: [] }
  );

  const sortedAddresses = sortByFarthestPoint(selectedAddress, pickupAddresses);
  const sortedGroups = sortedAddresses.map((a) =>
    groups.find((g) => g.address?.id === a.id)
  );

  return (
    <FlexibleModal className={className}>
      <div className="flex flex-col justify-between w-full h-full px-5 max-h-full overflow-auto">
        <div className="flex flex-col items-center gap-0.5 text-stone-500 py-5">
          <p>Minutes since order</p>
          <div className="bg-app-red-500 text-white font-bold flex items-center justify-center px-3 py-1 rounded-full">
            <span className="relative top-[1px]">
              12 <span className="relative -top-[1.5px]">:</span> 30
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 py-4 text-white text-opacity-60">
          <p>
            <span className="font-bold">{user.name}</span>
            <span> ordered </span>
            <span className="font-bold">{items.length}</span>{" "}
            <span>{hasMoreThanOneItem ? "items" : "item"}</span> {"from "}
            <span className="font-bold">{businesses.length}</span>{" "}
            <span>{hasMoreThanOneBusiness ? "businesses" : "business"}.</span>
          </p>
          <div className="flex gap-2 items-center text-white text-opacity-70 font-bold">
            <MapPin className="w-6 h-6 shrink-0" />
            <span>{selectedAddress?.name}</span>
          </div>
        </div>
        <div className="grow">
          {sortedGroups.map((group) => (
            <OrderGroup
              group={group}
              farthestPurchase={farthestPurchaseId}
              key={group?.id}
            />
          ))}
        </div>
        <div className="justify-self-stretch flex justify-center">
          <DeliveredBtn
            orderId={orderId}
            totalDeliveryPrice={totalDeliveryPrice}
            totalItemPrice={totalItemPrice}
          />
        </div>
      </div>
    </FlexibleModal>
  );
}

export default OrderMapModal;
