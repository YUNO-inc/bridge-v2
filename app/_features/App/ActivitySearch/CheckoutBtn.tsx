import { useAppDispatch, useAppSelector } from "@/app/_hooks/reduxHooks";
import { checkout, getCart } from "../../Cart/cartSlice";
import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import CircleLoader from "../../Loaders/CircleLoader";
import { openModal } from "../AppSlice";

function CheckoutBtn() {
  const { numTotalItems, isCheckingOut } = useAppSelector(getCart);
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
      title="Checkout"
      disabled={!numTotalItems}
      className={`w-8 h-8 bg-black rounded-full flex items-center justify-center hover:opacity-70 disabled:opacity-[0.3] transition-opacity`}
      onClick={handleCheckout}
    >
      {!isCheckingOut ? (
        <ArrowUpRightIcon className="fill-stone-200 w-5 h-5" />
      ) : (
        <CircleLoader size={20} color="white" animationDuration="1.4s" />
      )}
    </button>
  );
}

export default CheckoutBtn;
