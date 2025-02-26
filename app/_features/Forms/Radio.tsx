import { TrashIcon } from "@heroicons/react/24/outline";

function Radio({
  text = "select yes",
  value = "yes",
  isChecked = false,
  onChange,
  className,
  onDelete,
}: {
  text: string;
  value: string;
  isChecked: boolean;
  onChange: () => void;
  className: string;
  onDelete?: () => void;
}) {
  return (
    <label className={`flex items-center justify-between ${className}`}>
      <span className="flex items-center gap-2">
        <input
          type="radio"
          name="option"
          className="peer hidden"
          value={value}
          onChange={() => isChecked || onChange()}
          checked={isChecked}
          id="belu"
        />
        <span
          className={`flex items-center justify-center rounded-full min-w-[20px] w-[20px] h-[20px] border border-current transition-all ${
            isChecked ? "text-blue-500" : "text-stone-500"
          }`}
        >
          <span
            className={`rounded-full transition-all ${
              isChecked
                ? "w-[16px] h-[16px] bg-current"
                : "w-0 h-0 bg-transparent"
            }`}
          ></span>
        </span>
        <span className="wrap hyphens-auto">{text}</span>
      </span>
      <button
        className="flex items-center justify-center w-8 h-8 rounded-full bg-app-red bg-opacity-[0.1] ml-3"
        onClick={() => onDelete && onDelete()}
      >
        <TrashIcon className="w-4 h-4 stroke-app-red" />
      </button>
    </label>
  );
}

export default Radio;
