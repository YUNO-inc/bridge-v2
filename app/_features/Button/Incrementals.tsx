"use client";

import { useAppDispatch, useAppSelector } from "@/app/_hooks/reduxHooks";
import { DEFAULT_ADDRESS, ItemDTO } from "@/app/_interfaces/interfaces";
import { MinusIcon, PlusIcon } from "@heroicons/react/16/solid";
import { addToCart, deleteFromCart, getCart } from "../Cart/cartSlice";
import { getSelectedAddress } from "../User/userSlice";

function Incrementals({ item }: { item: ItemDTO }) {
  const { groups } = useAppSelector(getCart);
  const currItemGroup = groups.find((group) => {
    if (typeof item.businessData === "string") return false;
    return group.id === item.businessData.id;
  });
  const itemDups = currItemGroup?.items?.filter?.((it) => it.id === item.id);
  const dispatch = useAppDispatch();
  const selectedAddress = useAppSelector(getSelectedAddress);

  function handleDuplicate() {
    const dup = structuredClone(item);
    dup.createdAt = Date.now();
    dispatch(addToCart({ item: dup, deliveryAddress: selectedAddress }));
  }
  function handleRemoveDuplicate() {
    if (!itemDups?.length) return;
    const delItem = itemDups[0];

    if (typeof delItem.businessData === "string")
      throw new Error("Unable to remove this item from cart.");

    dispatch(
      deleteFromCart({
        delId: delItem.id,
        delAddedAt: delItem.createdAt,
        ownerId: delItem.businessData.id,
        delPrice: delItem.price,
        deliveryAddress: selectedAddress || DEFAULT_ADDRESS,
      })
    );
  }

  return (
    <div
      className={`bg-phthaloGreen bg-opacity-10 border border-phthaloGreen border-opacity-[0.37] flex items-center justify-between p-[3.5px] rounded-full w-[100px]`}
    >
      <ChangeBtn type="minus" increment={handleRemoveDuplicate} />
      <span className="leading-[0] self-center text-opacity-[0.37] text-phthaloGreen font-bold font-dune text-xs">
        {itemDups?.length || 0}
      </span>
      <ChangeBtn type="plus" increment={handleDuplicate} />
    </div>
  );
}

function ChangeBtn({
  type,
  increment,
}: {
  type?: "plus" | "minus";
  increment: () => void;
}) {
  return (
    <button className="bg-phthaloGreen bg-opacity-[0.37] rounded-full h-6 w-6 flex items-center justify-center shadow-sgc transition-all active:bg-opacity-10">
      {type === "plus" ? (
        <PlusIcon
          className="fill-phthaloGreen w-4 h-4"
          onClick={() => increment()}
        />
      ) : (
        <MinusIcon
          className="fill-phthaloGreen w-4 h-4"
          onClick={() => increment()}
        />
      )}
    </button>
  );
}

export default Incrementals;
