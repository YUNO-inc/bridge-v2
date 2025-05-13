import { AppModalDTO, ItemDTO } from "@/app/_interfaces/interfaces";
import Image from "next/image";

function CheckoutModal({
  checkoutProps,
}: {
  checkoutProps: AppModalDTO["props"]["checkout"];
}) {
  if (!checkoutProps)
    return (
      <ModalWrapper>
        <div className="text-xl font-bold text-app-red-500 text-opacity-70">
          Checkout error
        </div>
      </ModalWrapper>
    );

  const { order, errorMsg } = checkoutProps;

  if (!order)
    return (
      <ModalWrapper>
        <div className="text-xl font-bold text-app-red-500 text-nowrap text-opacity-90">
          Checkout error 🤖
        </div>
        <p className="text-app-red-500 text-opacity-[0.37]">{errorMsg}</p>
      </ModalWrapper>
    );

  return (
    <ModalWrapper>
      <div className="text-2xl font-bold text-phthaloGreen">
        Order Completed 🎉
      </div>
      <div>
        {order.items.map((item, i) => {
          if (typeof item === "string") return null;
          return <CheckoutItem item={item} key={`${order.id}-${i}`} />;
        })}
      </div>
      <p className="text-sm text-stone-800 text-opacity-[0.37]">
        Thanks for using bridge. We would call you to confirm your order.
      </p>
    </ModalWrapper>
  );
}

function ModalWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute top-[5%] left-[50%] -translate-x-[50%] flex flex-col bg-white rounded-[18px] px-3 max-w-[90%] shadow-sgc-light py-1">
      {children}
    </div>
  );
}

function CheckoutItem({ item }: { item: ItemDTO }) {
  return (
    <div className="flex items-center gap-2 border border-transparent border-opacity-[0.1] border-b-phthaloGreen last:border-b-transparent py-3">
      <div className="relative bg-phthaloGreen rounded-md bg-opacity-[0.37] shrink-0 h-8 w-8 sm:h-9 sm:w-9 overflow-hidden">
        <Image
          src={`${item.image}`}
          fill
          className="object-cover"
          alt={`Image of ${item.name} by ${
            typeof item.businessData === "string"
              ? "A business on Bridge Inc"
              : item.businessData.name
          }`}
        />
      </div>
      <div className="grow flex items-center gap-2 max-w-[80%]">
        <p className="max-w-[100%] overflow-hidden whitespace-nowrap text-ellipsis capitalize">
          {item.name}
        </p>
        <span className=" shrink-0 w-1 h-1 bg-phthaloGreen bg-opacity-55 rounded-full"></span>
        <span className="text-sm whitespace-nowrap">₦{item.price}</span>
      </div>
    </div>
  );
}

export default CheckoutModal;
