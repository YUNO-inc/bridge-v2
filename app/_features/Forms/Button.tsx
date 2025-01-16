"use client";

import { getRGB } from "@/app/_utils/helpers";
import { useState } from "react";
import CircleLoader from "../Loaders/CircleLoader";

function Button({ theme = "#123524", text = "", className = "" }) {
  const rgb = getRGB(theme);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <button
      className={`${className} rounded-full font-semibold shadow-sgc capitalize text-sm px-[7px] py-[15px] w-full`}
      style={{
        color: `rgb(${rgb})`,
        backgroundColor: `rgba(${rgb}, 0.37)`,
      }}
      onClick={() => setIsLoading((lo) => !lo)}
    >
      {isLoading ? (
        <span className="flex justify-center">
          <CircleLoader color="#123524" size={20} />
        </span>
      ) : (
        text
      )}
    </button>
  );
}

export default Button;
