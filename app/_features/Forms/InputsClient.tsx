"use client";

import { InputsProps } from "@/app/_interfaces/interfaces";
import { getRGB } from "@/app/_utils/helpers";
import HelperText from "./HelperText";

function InputsClient({
  type,
  theme = "#123524",
  label,
  helperText = " ",
  placeHolder,
  className = "",
  name = "",
  required = true,
  value = "",
  setValue,
}: Partial<InputsProps>) {
  const rgb = getRGB(theme);
  let inputType;

  if (type === "tel")
    inputType = (
      <input
        type="tel"
        name={`${name}`}
        id=""
        placeholder={placeHolder}
        className={
          "bg-transparent leading-[0px] focus:outline-none placeholder:text-phthaloGreen placeholder:text-opacity-[0.37]"
        }
        required={required}
        minLength={10}
        maxLength={11}
        value={value}
        onChange={(e) => setValue && setValue(e.target.value)}
      />
    );

  if (type === "text" || type === "email")
    inputType = (
      <input
        type={type}
        name={`${name}`}
        placeholder={placeHolder}
        className={
          "bg-transparent leading-[0px] focus:outline-none placeholder:text-phthaloGreen placeholder:text-opacity-[0.37]"
        }
        required={required}
        value={value}
        onChange={(e) => setValue && setValue(e.target.value)}
      />
    );

  return (
    <label className={`flex flex-col ${className}`}>
      <div
        className="flex flex-col py-2 px-4 rounded-lg min-h-[56px] justify-center"
        style={{
          border: `1px solid rgba(${rgb}, 0.1)`,
          backgroundColor: `rgba(${rgb}, 0.1)`,
        }}
      >
        {label && (
          <div className="text-xs" style={{ color: theme }}>
            {label}
          </div>
        )}
        {inputType}
      </div>
      {helperText && <HelperText helperText={helperText} />}
    </label>
  );
}

export default InputsClient;
