"use client";

import Image from "next/image";

import { useState } from "react";

type OptionType = { value: string; text?: string; png?: string };
type Options = { options: OptionType[]; className?: string };

function SelectInput({ options }: Options) {
  const [currValue, setCurrValue] = useState(options[0]);

  return (
    <div className="flex">
      {currValue.png && (
        <div className="relative w-[35px] max-h-[35px] hidden sw340:flex">
          <Image
            src={currValue.png}
            fill
            className="object-scale-down"
            alt={`${currValue.text || currValue.value} png`}
          />
        </div>
      )}
      <select
        onChange={(e) =>
          setCurrValue(
            (liveOption) =>
              options?.find((option) => option?.value === e.target?.value) ||
              liveOption
          )
        }
        className="bg-transparent leading-[0px] focus:outline-none text-phthaloGreen text-opacity-[0.37] placeholder:text-phthaloGreen placeholder:text-opacity-[0.37] grow"
      >
        <Option option={currValue} />
        {options
          .filter((option) => option.value !== currValue.value)
          .map((option) => (
            <Option option={option} key={option.value} />
          ))}
      </select>
    </div>
  );
}

function Option({ option: { value, text } }: { option: OptionType }) {
  return <option value={value}>{text || value}</option>;
}

export default SelectInput;
