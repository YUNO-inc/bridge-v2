import { useAppSelector } from "@/app/_hooks/reduxHooks";
import { ArrowLeft, MapPin } from "@phosphor-icons/react";
import { getCart } from "./cartSlice";
import CartGroup from "./CartGroup";
import { getSelectedAddress } from "../User/userSlice";
import { useRouter } from "next/navigation";
import EmptyCart from "./EmptyCart";

function Cart({ closeCart }: { cartIsOpen: boolean; closeCart: () => void }) {
  const { groups: cartGroups, numTotalItems } = useAppSelector(getCart);

  return (
    <div className="h-full flex flex-col bg-phthaloGreen bg-opacity-10 rounded-[25px] overflow-x-hidden overflow-y-auto p-4 text-phthaloGreen text-opacity-[1] border-[0.1px] border-phthaloGreen border-opacity-[0.37]">
      <Header closeCart={closeCart} />
      {numTotalItems > 0 ? (
        <div>
          {cartGroups.map((group) => (
            <CartGroup key={group.id} group={group} />
          ))}
        </div>
      ) : (
        <EmptyCart closeCart={closeCart} />
      )}
    </div>
  );
}

function Header({
  className,
  closeCart,
}: {
  className?: string;
  closeCart: () => void;
}) {
  const selectedAddress = useAppSelector(getSelectedAddress);
  const router = useRouter();

  return (
    <div className={`font-light ${className} flex justify-between`}>
      <div className="flex items-center gap-2">
        <button
          onClick={closeCart}
          className="bg-white w-8 h-8 flex items-center justify-center rounded-full"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="text-lg tracking-wider">Cart</div>
      </div>
      <button
        className={`flex justify-start items-center gap-[1px] max-w-[50%] ${
          !!selectedAddress?.name || "text-app-red-200 underline"
        }`}
        onClick={() => {
          if (!!selectedAddress?.name) router.push("/address");
          else router.push("/address/new?geoposition=true");
        }}
      >
        <MapPin weight="fill" className="w-4 h-4 shrink-0" />
        <span className="overflow-hidden whitespace-nowrap text-ellipsis">
          {selectedAddress?.name || "set up delivery Addres"}
        </span>
      </button>
    </div>
  );
}

export default Cart;
