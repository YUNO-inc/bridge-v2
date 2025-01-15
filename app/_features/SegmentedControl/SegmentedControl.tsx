"use client";

import { getRGB } from "@/app/_utils/helpers";
import { useState } from "react";

type SegmentedControlsProps = {
  labels: string[];
  color?: string;
  activeIndex: number;
  handleClick: (pageName: string) => void;
};

export default function SegmentedControl({
  labels,
  color = "#123524",
  activeIndex = 0,
  handleClick,
}: SegmentedControlsProps) {
  const [trueActiveIndex, setTrueActiveIndex] = useState(activeIndex);
  const rgb = getRGB(color);
  return (
    <div
      style={{
        border: `1px solid rgba(${rgb}, 0.37)`,
        backgroundColor: `rgba(${rgb}, 0.1)`,
      }}
      className={`min-w-[261px] flex justify-between p-[3.5px] rounded-full`}
    >
      {labels.map((label, i) => {
        const isActive = i === trueActiveIndex;
        return (
          <button
            key={i}
            style={{
              color: isActive ? `rgb(${rgb})` : `rgba(${rgb}, 0.37)`,
              backgroundColor: isActive ? `rgba(${rgb}, 0.37)` : ``,
            }}
            className={`grow capitalize text-sm pt-[6.78px] pb-[5.8px] rounded-full transition-[background-color,_color,_font-weight] duration-200 ease-in-out ${
              isActive ? `font-semibold shadow-sgc` : "font-medium"
            }`}
            onClick={() => {
              setTrueActiveIndex(i);
              handleClick(label);
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
