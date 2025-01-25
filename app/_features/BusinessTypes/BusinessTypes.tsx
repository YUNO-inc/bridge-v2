"use client";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import LocalIcons from "@/app/_utils/LocalIcons";

export default function BusinessTypes() {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const { scrollX } = useScroll({ container: carouselRef });
  const [currIndex, setCurrIndex] = useState(0);
  const businessTypes = [
    "shawarma",
    "shawarma",
    "shawarma",
    "shawarma",
    "shawarma",
    "shawarma",
    "shawarma",
    "shawarma",
    "shawarma",
    "shawarma",
    "shawarma",
    "shawarma",
    "shawarma",
    "shawarma",
    "shawarma",
    "shawarma",
    "shawarma",
    "shawarma",
    "shawarma",
    "shawarma",
    "shawarma",
    "shawarma",
  ];
  const widthOfItem = 40;

  useMotionValueEvent(scrollX, "change", (latest) => {
    const currentScrollIndex = Math.round(latest / widthOfItem);
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
    <div className="relative flex justify-center items-center bg-phthaloGreen-800 bg-opacity-10 w-[70%] rounded-full overflow-hidden border border-phthaloGreen-800 border-opacity-[0.37]">
      <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] h-[90%] w-[50px] bg-transparent border-[6px] border-x-transparent border-x-0 border-y-phthaloGreen-800 border-opacity-[0.5]"></div>
      <motion.div
        ref={carouselRef}
        className={`relative flex items-center h-6 overflow-auto scrollbar-hide px-[calc(50%-35px)] my-[14px]`}
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
    <div
      className={`relative flex justify-center items-center transition-all ease-out ${
        isActive ? "min-w-[70px]" : "min-w-[40px]"
      }`}
      onClick={() => handleClick(index)}
      style={{
        scrollSnapAlign: "center",
      }}
    >
      <LocalIcons
        name={type}
        pathClassName={[`transition-all ease-out fill-phthaloGreen-800`]}
        className={`w-5 transition-all ease-out ${
          isActive ? "w-6" : "opacity-[0.37]"
        }`}
      />
    </div>
  );
}

{
  /* <a target="_blank" href="https://icons8.com/icon/24461/rice-bowl">Rice Bowl</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */
}
