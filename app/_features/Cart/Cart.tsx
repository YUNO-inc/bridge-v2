import { useAppSelector } from "@/app/_hooks/reduxHooks";
import { MapPin } from "@phosphor-icons/react";
import { getCart } from "./cartSlice";
import CartGroup from "./CartGroup";

function Cart() {
  const { groups: cartGroups } = useAppSelector(getCart);

  return (
    <div className="h-full bg-phthaloGreen bg-opacity-10 rounded-[25px] overflow-x-hidden overflow-y-auto p-4 text-phthaloGreen text-opacity-[1] border-[0.1px] border-phthaloGreen border-opacity-[0.37]">
      <Header />
      <div>
        {cartGroups.map((group) => (
          <CartGroup key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}

function Header({ className }: { className?: string }) {
  return (
    <div className={`font-light ${className} flex justify-between`}>
      <div className="text-lg tracking-wider">Cart</div>
      <button className="flex justify-start items-center gap-[1px] max-w-[50%]">
        <MapPin weight="fill" className="w-4 h-4 min-w-4 min-h-4" />
        <span className="underline overflow-hidden whitespace-nowrap text-ellipsis">
          1, Babalola Avenue, Palmgrove
        </span>
      </button>
    </div>
  );
}

export default Cart;
