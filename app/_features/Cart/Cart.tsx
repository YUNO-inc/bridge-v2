import { useAppSelector } from "@/app/_hooks/reduxHooks";
import { ChevronRightIcon, MinusIcon } from "@heroicons/react/16/solid";
import { MapPin } from "@phosphor-icons/react";
import { getCart } from "./cartSlice";
import Image from "next/image";

function Cart() {
  const { items: cartItems } = useAppSelector(getCart);

  return (
    <div className="h-full bg-phthaloGreen bg-opacity-10 rounded-[25px] overflow-x-hidden overflow-y-auto p-4 text-phthaloGreen text-opacity-[1] border-[0.1px] border-phthaloGreen border-opacity-[0.37]">
      <Header />
      <div className="mt-5 flex flex-col">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-1 border border-transparent border-opacity-[0.1] border-b-phthaloGreen last:border-b-transparent py-3"
          >
            <div className="relative bg-phthaloGreen rounded-md bg-opacity-[0.37] shrink-0 h-11 w-11 overflow-hidden">
              <Image
                src={`/images/${item.image}`}
                fill
                className="object-cover"
                alt={`Image of ${item.name} by ${item.ownerData.name}`}
              />
            </div>
            <div className="grow flex justify-between items-center">
              <div className="grow flex flex-col">
                <div className="grow max-w-40 sw340:max-w-48 sw355:max-w-52 sw370:max-w-56 sw380:max-w-[234px] sw390:max-w-60 sw400:max-w-[250px] sw420:max-w-[280px] sw460:max-w-80 sw550:max-w-none flex items-center gap-2">
                  <p className="max-w-[300px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {item.name}
                  </p>
                  <span className=" shrink-0 w-1 h-1 bg-phthaloGreen bg-opacity-55 rounded-full"></span>
                  <span className=" text-[15px] whitespace-nowrap">
                    1 pairing
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold">₦{item.price}</span>
                  <button className="bg-phthaloGreen bg-opacity-[0.37] rounded-full p-1">
                    <ChevronRightIcon className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>
              <button className="bg-app-red bg-opacity-[0.1] rounded-full p-1">
                <MinusIcon className="fill-app-red w-5 h-5" />
              </button>
            </div>
          </div>
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

// <div className="flex items-center gap-1">
//   <div className="bg-phthaloGreen rounded-md bg-opacity-[0.37] shrink-0 h-11 w-11"></div>
//   <div className="grow flex justify-between items-center">
//     <div className="grow flex flex-col">
//       <div className="grow max-w-40 sw340:max-w-48 sw355:max-w-52 sw370:max-w-56 sw380:max-w-[234px] sw390:max-w-60 sw400:max-w-[250px] sw420:max-w-[280px] sw460:max-w-80 sw550:max-w-none flex items-center gap-2">
//         <p className="max-w-[300px] overflow-hidden whitespace-nowrap text-ellipsis">
//           Peperoni Rice
//         </p>
//         <span className=" shrink-0 w-1 h-1 bg-phthaloGreen bg-opacity-55 rounded-full"></span>
//         <span className=" text-[15px] whitespace-nowrap">1 pairing</span>
//       </div>
//       <div className="flex items-center gap-3">
//         <span className="text-sm font-semibold">$200</span>
//         <button className="bg-phthaloGreen bg-opacity-[0.37] rounded-full p-1">
//           <ChevronRightIcon className="w-4 h-4 fill-current" />
//         </button>
//       </div>
//     </div>
//     <button className="bg-app-red bg-opacity-[0.1] rounded-full p-1">
//       <MinusIcon className="fill-app-red w-5 h-5" />
//     </button>
//   </div>
// </div>;
