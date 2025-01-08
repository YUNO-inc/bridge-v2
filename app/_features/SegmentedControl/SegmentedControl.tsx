import { getRGB } from "@/app/_utils/helpers";

type SegmentedControlsProps = {
  labels: string[];
  color?: string;
};

export default function SegmentedControl({
  labels,
  color = "green",
}: SegmentedControlsProps) {
  const rgb = getRGB(color);
  return (
    <div
      style={{
        border: `1px solid rgba(${rgb}, 0.37)`,
        backgroundColor: `rgba(${rgb}, 0.1)`,
      }}
      className={`min-w-[261px] flex justify-between p-[3.5px] rounded-full`}
    >
      {labels.map((label, i) => (
        <button
          key={i}
          style={{
            color: i === 0 ? `rgb(${rgb})` : `rgba(${rgb}, 0.37)`,
            backgroundColor: i === 0 ? `rgba(${rgb}, 0.37)` : ``,
          }}
          className={`capitalize grow pt-[6.78px] pb-[5.8px] text-sm ${
            i === 0 ? `rounded-full font-semibold shadow-sgc` : "font-medium"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
