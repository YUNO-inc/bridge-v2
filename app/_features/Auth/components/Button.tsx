import Image from "next/image";

type ButtonProps = {
  type: "google" | "apple";
};

function Button({ type }: ButtonProps) {
  return (
    <button className="flex gap-4 justify-center items-center border border-grey2 py-[15px] px-12 shadow-purple rounded-full transition-[background-color] duration-300 hover:bg-grey2">
      <Image
        src={`/images/${type}-icon.png`}
        height={23}
        width={23}
        alt={`logo of ${type}`}
      />
      <span className="text-lg font-medium">
        Sign in with
        <span className="capitalize"> {type}</span>
      </span>
    </button>
  );
}

export default Button;
