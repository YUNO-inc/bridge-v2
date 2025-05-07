"use client";

import { useAppSelector } from "@/app/_hooks/reduxHooks";
import { getCart } from "../../Cart/cartSlice";

function ActivityItem({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) {
  const { numTotalItems } = useAppSelector(getCart);

  return (
    <div
      className={`absolute top-0 left-0 bg-[#f2f2f2] h-full shrink-0 w-full rounded-[25px] overflow-x-hidden overflow-y-auto ${
        numTotalItems && "pb-[90px]"
      } ${show ? "block" : "hidden"}`}
    >
      {children}
    </div>
  );
}

export default ActivityItem;
