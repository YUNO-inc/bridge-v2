import { getRGB } from "@/app/_utils/helpers";
import CircleLoader from "../Loaders/CircleLoader";

type ButtonProps = {
  text: string;
  theme?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
};

function Button({
  theme = "#123524",
  text = "",
  className = "",
  type = "button",
  isLoading,
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
