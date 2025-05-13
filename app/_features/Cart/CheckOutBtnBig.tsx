import GlassContainer from "../Glass/GlassContainer";
import IconAndText from "./IconAndText";
import LocalIcons from "@/app/_utils/LocalIcons";
import { ArrowUpRight, MoneyWavy } from "@phosphor-icons/react";
import { useAppDispatch, useAppSelector } from "@/app/_hooks/reduxHooks";
import { checkout, getCart } from "./cartSlice";
import CircleLoader from "../Loaders/CircleLoader";
import { openModal } from "../App/AppSlice";

function CheckOutBtnBig() {
  const { deliveryTotal, priceTotal, isCheckingOut } = useAppSelector(getCart);
  const dispatch = useAppDispatch();

  async function handleCheckout() {
    try {
      const order = await dispatch(checkout()).unwrap();
      dispatch(
        openModal({
          isOpen: true,
          type: "checkout",
          props: {
            checkout: {
              order,
            },
          },
        })
      );
    } catch (error) {
      const err = error as Error;
      dispatch(
        openModal({
          isOpen: true,
          type: "checkout",
          props: {
            checkout: {
              errorMsg:
                err.message || "There was an error processing your order.",
            },
          },
        })
      );
    }
  }

  return (
    <button
      className="relative flex flex-col mx-4 my-2 mb-6 text-phthaloGreen p-6"
      onClick={handleCheckout}
    >
      <span
        className={`top-[10px] left-[50%] -translate-x-[50%] absolute w-full h-full rounded-3xl transition-colors ${
          !isCheckingOut ? "bg-phthaloGreen/80" : "bg-phthaloGreen/80"
        }`}
      ></span>
      <GlassContainer
        className={`h-[95%] w-[95%] absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] transition-all ${
          !isCheckingOut
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
              text={`₦${deliveryTotal}`}
            />
            <IconAndText
              icon={<MoneyWavy className="w-3.5 h-3.5 fill-phthaloGreen" />}
              text={`₦${priceTotal}`}
            />
          </div>
          <div className="flex items-center text-white text-opacity-[0.47]">
            {!isCheckingOut ? (
              <>
                <span>Checkout</span>
                <ArrowUpRight />
              </>
            ) : (
              // <span className="text-black text-opacity-[0.47] animate-pulse pr-3">
              //   Processing...
              // </span>
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

export default CheckOutBtnBig;
