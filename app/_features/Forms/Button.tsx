import { getRGB } from "@/app/_utils/helpers";
import CircleLoader from "../Loaders/CircleLoader";
import { MouseEventHandler } from "react";

type ButtonProps = {
  text: string;
  theme?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

function Button({
  theme = "#123524",
  text = "",
  className = "",
  type = "button",
  isLoading,
  onClick = () => {},
}: ButtonProps) {
  const rgb = getRGB(theme);

  return (
    <button
      className={`${className} rounded-full font-semibold shadow-sgc capitalize text-sm px-[7px] py-[15px] w-full`}
      style={{
        color: `rgb(${rgb})`,
        backgroundColor: `rgba(${rgb}, 0.37)`,
      }}
      type={type}
      onClick={onClick}
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
