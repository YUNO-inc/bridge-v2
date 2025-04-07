"use client";

import { useAppSelector } from "@/app/_hooks/reduxHooks";
import LocalIcons from "@/app/_utils/LocalIcons";
import { getCart } from "./cartSlice";

export default function CartButton({ openCart }: { openCart: () => void }) {
  const { deliveryTotal, priceTotal, numTotalItems } = useAppSelector(getCart);

  return (
    <button
      className="bg-phthaloGreen text-phthaloGreen-50 backdrop-blur-md text-sm px-4 py-4 w-full flex items-center justify-between rounded-[16px] shadow-sgc"
      onClick={openCart}
    >
      <span>Cart</span>
      <span className="flex items-center gap-[6px] text-[13px]">
        <span>
          {numTotalItems} item{numTotalItems === 1 ? "" : "s"}
        </span>
        <span className="w-1 h-1 bg-phthaloGreen-50 bg-opacity-55 rounded-full"></span>
        <span className="flex gap-1">
          <span>₦{deliveryTotal + priceTotal}</span>
          <span className="relative bottom-[-2px]">
            <LocalIcons
              name="rider2"
              className="w-[14px] h-[14px] fill-transparent"
              pathClassName={["fill-phthaloGreen-50", "stroke-phthaloGreen-50"]}
            />
          </span>
        </span>
      </span>
    </button>
  );
}
