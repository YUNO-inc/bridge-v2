import { getRGB } from "@/app/_utils/helpers";
import SelectInput from "./SelectInput";
import HelperText from "./HelperText";

type InputsProps = {
  type: "tel" | "select";
  theme?: string;
  label?: string;
  helperText?: string;
  selectOpt?: { value: string; text?: string; png?: string }[];
  placeHolder?: string;
  className?: string;
};

function Inputs({
  type,
  theme = "#123524",
  label,
  helperText = " ",
  selectOpt = [],
  placeHolder,
  className = "",
}: InputsProps) {
  const rgb = getRGB(theme);
  let inputType;

  if (type === "tel")
    inputType = (
      <input
        type="tel"
        name=""
        id=""
        placeholder={placeHolder}
        className={
          "bg-transparent leading-[0px] focus:outline-none placeholder:text-phthaloGreen placeholder:text-opacity-[0.37]"
        }
      />
    );

  if (type === "select")
    inputType = <SelectInput options={selectOpt} className={className} />;

  // focus:ring focus:ring-phthaloGreen-200 focus:ring-offset-2

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

export default Inputs;
