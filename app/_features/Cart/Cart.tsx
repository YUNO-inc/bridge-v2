import { useAppDispatch, useAppSelector } from "@/app/_hooks/reduxHooks";
import { ArrowLeft, MapPin } from "@phosphor-icons/react";
import { getCart, setLocalCart } from "./cartSlice";
import CartGroup from "./CartGroup";
import { getSelectedAddress } from "../User/userSlice";
import { useRouter } from "next/navigation";
import EmptyCart from "./EmptyCart";
import CheckOutBtnBig from "./CheckOutBtnBig";
import { useEffectOncePerPageLoad } from "@/app/_hooks/useEffectOncePerPageLoad";

function Cart({ closeCart }: { closeCart: () => void }) {
  const {
    groups: cartGroups,
    numTotalItems,
    cartIsOpen,
  } = useAppSelector(getCart);
  const dispatch = useAppDispatch();

  useEffectOncePerPageLoad(() => {
    dispatch(setLocalCart());
  }, "load-local-cart");

  return (
    <div
      className={`absolute h-full w-full flex flex-col bg-phthaloGreen bg-opacity-10 rounded-[25px] overflow-x-hidden overflow-y-auto text-phthaloGreen text-opacity-[1] border-[0.1px] border-phthaloGreen border-opacity-[0.37] transition-all ${
        cartIsOpen ? "left-0 visible opacity-100" : "left-3 invisible opacity-0"
      }`}
    >
      <Header closeCart={closeCart} />
      {numTotalItems > 0 ? (
        <>
          <div className="px-4 pb-4 grow flex flex-col">
            {cartGroups.map((group) => (
              <CartGroup key={group.id} group={group} />
            ))}
          </div>
          <CheckOutBtnBig />
        </>
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
    <div className="sticky top-0 left-0 z-10">
      <div
        className={`p-4 backdrop-blur-[50px] overflow-auto font-light ${className} flex justify-between`}
      >
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
    </div>
  );
}

export default Cart;
