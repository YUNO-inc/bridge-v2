"use client";

import { motion, useMotionValue } from "motion/react";
import { useState } from "react";
import PageControl from "../../PageControl/PageControl";

function ActivityContainer({ currPageIndex = 0 }) {
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

  return (
    <div className="w-full">
      <div className="relative w-full flex justify-center items-center overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          animate={{
            translateX: `calc((${pageIndex} * -100%) - ${
              pageIndex > 0 ? "16px" : "0px"
            })`,
          }}
          transition={{ type: "spring", mass: 3, stiffness: 400, damping: 50 }}
          onDragEnd={onDragEnd}
          style={{ x: dragX }}
          className="flex w-full gap-4 h-[400px] max-h-[63.7dvh] min-h-72 active:cursor-grabbing"
        >
          <div className="bg-[#f2f2f2] h-full shrink-0 w-full rounded-[25px]"></div>
          <div className="bg-[#f2f2f2] h-full shrink-0 w-full rounded-[25px]"></div>
        </motion.div>
        <div className="absolute left-1/2 translate-x-[-50%] bottom-1 z-10">
          <PageControl
            numOptions={2}
            activeIndex={pageIndex}
            setActiveIndex={setPageIndex}
          />
        </div>
      </div>
    </div>
  );
}

export default ActivityContainer;
