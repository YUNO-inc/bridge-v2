import { TrashIcon } from "@heroicons/react/24/outline";

function Radio({
  text = "select yes",
  value = "yes",
  isChecked = false,
}: {
  text: string;
  value: string;
  isChecked: boolean;
}) {
  return (
    <label className="flex items-center justify-between">
      <span className="flex items-center gap-2">
        <input
          type="radio"
          name="option"
          className="peer hidden"
          value={value}
          onChange={() => {}}
          checked={isChecked}
        />
        <button
          className={`flex items-center justify-center rounded-full w-[20px] h-[20px] border border-current transition-all ${
            isChecked ? "text-blue-500" : "text-stone-500"
          }`}
        >
          {isChecked && (
            <span className="rounded-full w-[16px] h-[16px] bg-current"></span>
          )}
        </button>
        <span className="wrap hyphens-auto">{text}</span>
      </span>
      <button className="flex items-center justify-center w-8 h-8 rounded-full bg-app-red bg-opacity-[0.1] ml-3">
        <TrashIcon className="w-4 h-4 stroke-app-red" />
      </button>
    </label>
  );
}

export default Radio;
