"use client";
import { useRef } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import LocalIcons from "@/app/_utils/LocalIcons";

export default function BusinessTypes() {
  const carouselRef = useRef(null);
  const { scrollX, scrollXProgress } = useScroll({ container: carouselRef });

  useMotionValueEvent(scrollX, "change", (latest) => {
    console.log("Page scroll: ", latest);
  });
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
  const activeIndex = 0;
  console.log(businessTypes.length);

  return (
    <div className="relative flex justify-center items-center bg-app-red-500 bg-opacity-10 h-[50px] w-[70%] rounded-full">
      <div ref={carouselRef} className="flex items-center h-full overflow-auto">
        {businessTypes.map((type, i) => {
          return (
            <div
              className={`flex justify-center items-center ${
                i === activeIndex ? "w-8" : "w-8"
              }`}
              key={i}
            >
              <LocalIcons
                name={type}
                pathClassName={["fill-app-red"]}
                className="h-5"
              />
            </div>
          );
        })}
      </div>
      <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] h-[80%] w-10 bg-transparent border-[6px] border-x-transparent border-x-0 border-y-app-red-500 border-opacity-[0.37]"></div>
    </div>
  );
}
