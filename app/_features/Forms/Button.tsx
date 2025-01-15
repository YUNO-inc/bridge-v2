import { getRGB } from "@/app/_utils/helpers";

function Button({ theme = "#123524", text = "", className = "" }) {
  const rgb = getRGB(theme);

  return (
    <button
      className={`rounded-full font-semibold shadow-sgc capitalize text-sm px-[7px] py-[15px] w-full ${className}`}
      style={{
        color: `rgb(${rgb})`,
        backgroundColor: `rgba(${rgb}, 0.37)`,
      }}
    >
      {text}
    </button>
  );
}

export default Button;
