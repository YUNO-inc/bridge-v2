"use client";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import LocalIcons from "@/app/_utils/LocalIcons";

export default function BusinessTypes() {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const { scrollX } = useScroll({ container: carouselRef });
  const [currIndex, setCurrIndex] = useState(0);
  const businessTypes = ["shawarma", "food"];
  const widthOfItem = 40;

  useMotionValueEvent(scrollX, "change", (latest) => {
    let currentScrollIndex = Math.round(latest / widthOfItem);
    currentScrollIndex = currentScrollIndex < 0 ? 0 : currentScrollIndex;
    setCurrIndex(currentScrollIndex);
  });

  const handleSnapScroll = (index: number) => {
    const container = carouselRef.current;
    if (!container) return;
    container.scrollTo({
      left: index * widthOfItem,
      behavior: "smooth",
    });
    setCurrIndex(index);
  };

  return (
    <div className=" bg-opacity-10 w-[70%] rounded-xl  border-opacity-[0.37]">
      <div className="relative flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] h-[90%] w-[50px] bg-transparent border-[6px] border-x-transparent border-x-0 border-y-phthaloGreen-500 border-opacity-[0.5]"></div>
        <motion.div
          ref={carouselRef}
          className={`relative flex items-center h-7 overflow-scroll scrollbar-hide px-[calc(50%-35px)] mt-[10px] w-full`}
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
        <p className="text-center text-sm text-phthaloGreen-500 text-opacity-[0.5] capitalize mb-[10px]">
          {businessTypes[currIndex]}
        </p>
      </div>
      {/* <p className="text-center text-sm text-phthaloGreen-500 text-opacity-[0.37] capitalize">
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
      className={`relative flex justify-center items-center ${
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
          `transition-all fill-phthaloGreen-500 ${
            isActive ? "opacity-1" : "opacity-[0.37]"
          }`,
        ]}
        className={`w-5 transition-all ease-out duration-300 delay-[0.05s] ${
          isActive ? "scale-[1.2]" : ""
        }`}
      />
    </button>
  );
}
