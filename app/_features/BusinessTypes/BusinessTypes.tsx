"use client";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import LocalIcons from "@/app/_utils/LocalIcons";
import { useAppDispatch, useAppSelector } from "@/app/_hooks/reduxHooks";
import { getAppData, setLoading } from "../App/AppSlice";
import { useRouter } from "next/navigation";

export default function BusinessTypes() {
  const router = useRouter();
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const { scrollX } = useScroll({ container: carouselRef });
  const [currIndex, setCurrIndex] = useState(0);
  const { businessTypes } = useAppSelector(getAppData);
  const dispatch = useAppDispatch();
  const widthOfItem = 40;

  useMotionValueEvent(scrollX, "change", (latest) => {
    let currentScrollIndex = Math.round(latest / widthOfItem);
    currentScrollIndex = currentScrollIndex < 0 ? 0 : currentScrollIndex;
    handleBTChange(currentScrollIndex);
  });

  const handleSnapScroll = (index: number) => {
    const container = carouselRef.current;
    if (!container) return;
    container.scrollTo({
      left: index * widthOfItem,
      behavior: "smooth",
    });
    handleBTChange(index);
  };

  function handleBTChange(index: number) {
    dispatch(setLoading({ isLoading: true, page: "default" }));
    setCurrIndex(index);
    router.replace(`/app?bt=${encodeURIComponent(businessTypes[index])}`);
  }

  return (
    <div className="bg-phthaloGreen bg-opacity-10 w-[70%] rounded-xl border border-phthaloGreen border-opacity-[0.37]">
      <div className="relative flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] h-[90%] w-[50px] bg-transparent border-[6px] border-x-transparent border-x-0 border-y-phthaloGreen border-opacity-[0.5]"></div>
        <motion.div
          ref={carouselRef}
          className={`relative flex h-[49px] overflow-scroll scrollbar-hide px-[calc(50%-35px)] my-[10px] w-full z-10`}
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {businessTypes.map((type, i) => (
            <BusinessItem
              key={i}
              type={type}
              isActive={i === currIndex}
              index={i}
              handleClick={handleSnapScroll}
            />
          ))}
        </motion.div>
        <p className="absolute bottom-[10px] left-1/2 translate-x-[-50%] text-center text-sm text-phthaloGreen capitalize">
          {businessTypes[currIndex]}
        </p>
      </div>
      {/* <p className="text-center text-sm text-phthaloGreen text-opacity-[0.37] capitalize">
        {businessTypes[currIndex]}
      </p> */}
    </div>
  );
}

function BusinessItem({
  type = "",
  isActive = false,
  handleClick,
  index,
}: {
  type: string;
  isActive: boolean;
  index: number;
  handleClick: (index: number) => void;
}) {
  return (
    <button
      type="button"
      className={`relative flex justify-center mt-[5px] ${
        isActive ? "min-w-[70px]" : "min-w-[40px]"
      }`}
      onClick={() => handleClick(index)}
      style={{
        scrollSnapAlign: "center",
      }}
    >
      <LocalIcons
        name={type}
        pathClassName={[
          `transition-all fill-phthaloGreen ${
            isActive ? "opacity-1" : "opacity-[0.37]"
          }`,
        ]}
        className={`w-5 h-5 transition-all ease-out duration-300 delay-[0.05s] ${
          isActive ? "scale-[1.2]" : ""
        }`}
      />
    </button>
  );
}
