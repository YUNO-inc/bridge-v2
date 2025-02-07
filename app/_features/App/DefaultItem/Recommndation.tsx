import { useAppDispatch, useAppSelector } from "@/app/_hooks/reduxHooks";
import { ItemDTO } from "@/app/_interfaces/interfaces";
import { PlusIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { addToCart, getCart } from "../../Cart/cartSlice";
import CheckAnimation from "../../CheckAnimation/CheckAnimation";

function Recommndations({
  rec,
  businessName,
}: {
  rec: ItemDTO;
  businessName: string;
}) {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(getCart);
  const isInCart = cart.some((item) => item?.id === rec.id);

  function handleAddToCart(item: ItemDTO) {
    dispatch(addToCart(item));
  }

  return (
    <div
      role="button"
      className="bg-stone-800 bg-opacity-10 py-2 px-2 rounded-[7px] flex items-center gap-2 text-sm"
    >
      <div
        className="relative shrink-0 w-12 h-12 rounded-[4px] overflow-hidden"
        onClick={() => handleAddToCart(rec)}
      >
        <Image
          src={`/images/${rec.image}`}
          fill
          className="object-cover"
          alt={`Image of ${rec.name} by ${businessName}`}
        />
        <div
          className={`absolute h-[30%] w-full bg-opacity-[0.9] backdrop-blur-[1px] z-10 bottom-0 left-0 rounded-b-[4px] flex items-center justify-center py-1.5 transition-all duration-500 ${
            isInCart
              ? "border-opacity-[1] bg-opacity-[1] bg-phthaloGreen"
              : "bg-opacity-50 bg-phthaloGreen-50"
          }`}
        >
          {isInCart ? (
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
      <div className="flex flex-col justify-between text-left">
        <p className="w-max max-w-[170px] capitalize">{rec.name}</p>
        <p>₦{rec.price}</p>
      </div>
    </div>
  );
}

export default Recommndations;
