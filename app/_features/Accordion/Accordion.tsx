"use client";

import { CaretDown } from "@phosphor-icons/react";
import { useState } from "react";

function Accordion({
  btnContent,
  expandContent,
  startsOpen = false,
  animateExpand = true,
  showCaret = true,
  btnClassName,
  contentActiveClassName,
  contentInactiveClassName,
}: {
  btnContent: React.ReactNode;
  expandContent: React.ReactNode;
  startsOpen?: boolean;
  animateExpand?: boolean;
  showCaret?: boolean;
  btnClassName?: React.HTMLAttributes<HTMLElement>["className"];
  contentActiveClassName: React.HTMLAttributes<HTMLElement>["className"];
  contentInactiveClassName: React.HTMLAttributes<HTMLElement>["className"];
}) {
  const [isOpen, setIsOpen] = useState(startsOpen);

  return (
    <div
      className={`bg-phthaloGreen bg-opacity-10 text-left font-semibold text-phthaloGreen rounded-[16px] px-4 text-sm transition-all ${
        isOpen ? "shadow-sgc" : "shadow-none"
      }`}
    >
      <button
        className={`w-full gap-2 border border-b-phthaloGreen ${btnClassName} ${
          isOpen ? "border-opacity-10" : "border-opacity-0"
        }`}
        onClick={() => setIsOpen((i) => !i)}
      >
        {btnContent}
        {showCaret ? (
          <CaretDown
            weight="bold"
            className={`w-5 min-w-5 transition ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        ) : (
          ""
        )}
      </button>
      <div
        className={
          animateExpand
            ? `transition-[all] duration-[0.3s] ease-linear ${
                isOpen
                  ? `max-h-80 ${contentActiveClassName}`
                  : `max-h-0 overflow-hidden ${contentInactiveClassName}`
              }`
            : `${
                isOpen
                  ? `${contentActiveClassName}`
                  : `h-0 overflow-hidden ${contentInactiveClassName}`
              }`
        }
      >
        {expandContent}
      </div>
    </div>
  );
}

export default Accordion;
