import GlassContainer from "../Glass/GlassContainer";
import IconAndText from "./IconAndText";
import LocalIcons from "@/app/_utils/LocalIcons";
import { ArrowUpRight, MoneyWavy } from "@phosphor-icons/react";
import { useAppSelector } from "@/app/_hooks/reduxHooks";
import { getCart } from "./cartSlice";

function CheckOutBtnBig() {
  const { deliveryTotal, priceTotal } = useAppSelector(getCart);

  return (
    <button className="relative flex flex-col mx-4 my-2 mb-6 text-phthaloGreen p-6">
      <span className="top-[10px] left-[50%] -translate-x-[50%]  absolute w-full h-full bg-phthaloGreen/80 rounded-3xl"></span>
      <GlassContainer className="h-[95%] w-[95%] absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
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
              text={`₦${deliveryTotal}`}
            />
            <IconAndText
              icon={<MoneyWavy className="w-3.5 h-3.5 fill-phthaloGreen" />}
              text={`₦${priceTotal}`}
            />
          </div>
          <div className="flex items-center text-white text-opacity-[0.47]">
            <span>Checkout</span>
            <ArrowUpRight />
          </div>
        </div>
      </GlassContainer>
    </button>
  );
}

export default CheckOutBtnBig;
