import { ItemDTO } from "@/app/_interfaces/interfaces";
import { PlusIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import CheckAnimation from "../CheckAnimation/CheckAnimation";
import { useState } from "react";
import { useAppDispatch } from "@/app/_hooks/reduxHooks";
import { addToCart } from "../Cart/cartSlice";

function ItemImage({ item, className }: { item: ItemDTO; className?: string }) {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useAppDispatch();
  const ACTIVE_TIMEOUT = 2000;

  function handleAddToCart(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    dispatch(addToCart(item));
    setIsActive(true);
    setTimeout(() => setIsActive(false), ACTIVE_TIMEOUT);
  }

  return (
    <div
      className={`relative shrink-0 w-12 h-12 rounded-[13.333%] overflow-hidden border-none ${className}`}
      onClick={handleAddToCart}
    >
      <Image
        src={`/images/${item.image}`}
        fill
        className="object-cover"
        alt={`Image of ${item.name} by ${item.ownerData.name}`}
      />
      <div
        className={`absolute h-[30%] w-full bg-opacity-[0.9] backdrop-blur-[1px] z-10 bottom-0 left-0 flex items-center justify-center py-1.5 transition-all duration-500 border-none ${
          isActive
            ? "bg-opacity-[1] bg-phthaloGreen"
            : "bg-opacity-50 bg-phthaloGreen-50"
        }`}
      >
        {isActive ? (
          <CheckAnimation
            size={11}
            message=""
            color="#F1F2F1"
            loaderIterationCount={0}
            durationPerCircle={0.5}
          />
        ) : (
          <PlusIcon className="fill-phthaloGreen w-3.5 h-3.5" />
        )}
      </div>
    </div>
  );
}

export default ItemImage;
