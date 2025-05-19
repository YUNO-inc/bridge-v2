import { useState } from "react";
import { ArrowUpRight, MoneyWavy } from "@phosphor-icons/react";
import GlassContainer from "../Glass/GlassContainer";
import CircleLoader from "../Loaders/CircleLoader";
import IconAndText from "../Cart/IconAndText";
import LocalIcons from "@/app/_utils/LocalIcons";
import { OrderDTO } from "@/app/_interfaces/interfaces";
import { UpdateOrderStatusAction } from "@/app/_lib/order/actions";

function DeliveredBtn({
  orderId,
  totalDeliveryPrice,
  totalItemPrice,
  className,
}: {
  orderId: OrderDTO["id"];
  totalDeliveryPrice: OrderDTO["totalDeliveryPrice"];
  totalItemPrice: OrderDTO["totalItemPrice"];
  className?: string;
}) {
  const [isSettingDelivered, setIsSettingDelivered] = useState(false);

  async function handleSetDelivered() {
    setIsSettingDelivered(true);
    try {
      console.log(orderId, "delivered");
      await UpdateOrderStatusAction(orderId, "delivered");
    } catch (error) {
      const err = error as Error;
      console.error(err);
    } finally {
      setIsSettingDelivered(false);
    }
  }

  return (
    <button
      className={`relative flex flex-col my-2 mb-6 text-phthaloGreen p-6 w-full ${className}`}
      onClick={handleSetDelivered}
    >
      <span
        className={`top-[10px] left-[50%] -translate-x-[50%] absolute w-full h-full rounded-3xl transition-colors bg-phthaloGreen/80`}
      ></span>
      <GlassContainer
        className={`h-[95%] w-[95%] absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] transition-all ${
          isSettingDelivered
            ? "shadow-sgc active:top-[58%] active:scale-[0.99]"
            : ""
        }`}
      >
        <div className="w-full flex justify-between items-center px-2">
          <div className="py-3 flex items-center gap-3">
            <IconAndText
              icon={
                <LocalIcons
                  name="rider"
                  className="w-3 h-3 fill-transparent"
                  pathClassName={[
                    "fill-phthaloGreen fill-opacity-[0.3] ",
                    "stroke-phthaloGreen stroke-opacity-[0.3] ",
                  ]}
                />
              }
              text={`₦${totalDeliveryPrice}`}
            />
            <IconAndText
              icon={<MoneyWavy className="w-3.5 h-3.5 fill-phthaloGreen" />}
              text={`₦${totalItemPrice}`}
            />
          </div>
          <div className="flex items-center text-white text-opacity-[0.47]">
            {!isSettingDelivered ? (
              <>
                <span>Deliver</span>
                <ArrowUpRight />
              </>
            ) : (
              <div className="flex items-center justify-center bg-phthaloGreen bg-opacity-[0.37] w-7 h-7 rounded-full animate-pulse">
                <CircleLoader
                  size={20}
                  animationDuration="1.4s"
                  color="rgb(18 53 36 / 1)"
                />
              </div>
            )}
          </div>
        </div>
      </GlassContainer>
    </button>
  );
}

export default DeliveredBtn;
