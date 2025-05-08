"use client";

import { motion, useMotionValue } from "motion/react";
import { useEffect, useState } from "react";
import PageControl from "../../PageControl/PageControl";
import ActivityControlsSegmentedControl from "../ActivityControlsSegmentedControl";
import CartButton from "../../Cart/CartButton";
import { useAppDispatch, useAppSelector } from "@/app/_hooks/reduxHooks";
import { getCart, toogleCartIsOpen } from "../../Cart/cartSlice";
import Cart from "../../Cart/Cart";
import { useRouter, useSearchParams } from "next/navigation";

function ActivityContainer({
  currPageIndex = 0,
  container,
}: {
  currPageIndex?: number;
  container: React.ReactNode;
}) {
  const { numTotalItems, cartIsOpen } = useAppSelector(getCart);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasCartURL = searchParams.get("cart");
  const MAX_PAGE_INDEX = 1;
  const DRAG_BUFFER = 33;
  const [pageIndex, setPageIndex] = useState(currPageIndex);
  const dragX = useMotionValue(0);

  const onDragEnd = () => {
    const x = dragX.get();
    if (x <= -DRAG_BUFFER && pageIndex < MAX_PAGE_INDEX) {
      setPageIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && pageIndex > 0) {
      setPageIndex((pv) => pv - 1);
    }
  };

  function toogleCartIsOpenState(newState: boolean) {
    dispatch(toogleCartIsOpen({ open: newState }));

    if (!newState) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("cart");
      router.replace(`?${params.toString()}`);
    }
  }

  useEffect(
    function () {
      if (!hasCartURL) return;
      else dispatch(toogleCartIsOpen({ open: true }));
    },
    [dispatch, hasCartURL]
  );

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="relative w-full flex justify-center items-center overflow-hidden">
        <motion.div
          animate={{
            translateX: `calc((${pageIndex} * -100%) - ${
              pageIndex > 0 ? "16px" : "0px"
            })`,
          }}
          transition={{ type: "spring", mass: 3, stiffness: 400, damping: 50 }}
          className={`flex w-full gap-4 sw700:h-[60dvh] h-[50dvh] max-h-[63.7dvh] min-h-[400px] active:cursor-grabbing ${
            cartIsOpen ? "opacity-0" : "opacity-100"
          }`}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
            style={{ x: dragX }}
            className="h-full w-full shrink-0 relative"
          >
            {container}
          </motion.div>
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
            style={{ x: dragX }}
            className="bg-[#f2f2f2] h-full shrink-0 w-full rounded-[25px] overflow-hidden"
          ></motion.div>
        </motion.div>
        <div
          className={`absolute w-full left-1/2 translate-x-[-50%] px-2 flex flex-col gap-1 items-center z-10 transition-all bottom-2 ${
            cartIsOpen ? "-bottom-3 invisible opacity-0" : "visible opacity-100"
          }`}
        >
          <PageControl
            numOptions={2}
            activeIndex={pageIndex}
            setActiveIndex={setPageIndex}
            className={!numTotalItems ? "shadow-sgc" : ""}
          />
          {!!numTotalItems && (
            <CartButton openCart={() => toogleCartIsOpenState(true)} />
          )}
        </div>
        <Cart closeCart={() => toogleCartIsOpenState(false)} />
      </div>
      <ActivityControlsSegmentedControl />
    </div>
  );
}

export default ActivityContainer;
