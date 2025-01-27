"use client";

import { anonymousPro } from "@/app/fonts";

type PageControlProps = {
  text?: string;
  numOptions?: number;
  activeIndex?: number;
  setActiveIndex?: (dotIndex: number) => void; //This can be an array also if multiple functionalities are needed.
};

export default function PageControl({
  text,
  numOptions = 2,
  activeIndex = 1,
  setActiveIndex,
}: PageControlProps) {
  function handleDotClick(dotIndex: number) {
    if (!setActiveIndex) return;

    setActiveIndex(dotIndex);
  }

  if (text)
    return (
      <div className="bg-grey1 px-3 py-2 max-h-6 bg-opacity-[44%] rounded-full flex items-center justify-center backdrop-blur-[50px]">
        <span
          className={`text-black text-opacity-45 text-sm sm:text-base ${anonymousPro.className}`}
        >
          {text}
        </span>
      </div>
    );

  return (
    <div className="bg-grey1 px-3 py-2 max-h-6 bg-opacity-[44%] rounded-full flex items-center justify-center gap-2">
      {Array.from({ length: numOptions }, (_, index) => (
        <button
          key={index}
          className={`w-2 h-2 bg-black rounded-full transition-all duration-300 ${
            activeIndex === index ? "bg-opacity-100" : "bg-opacity-30"
          }`}
          onClick={() => handleDotClick(index)}
        ></button>
      ))}
    </div>
  );
}
