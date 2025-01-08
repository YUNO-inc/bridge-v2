type SegmentedControlsProps = {
  labels: string[];
  color?: string;
};

export default function SegmentedControl({
  labels,
  color = "phthaloGreen",
}: SegmentedControlsProps) {
  return (
    <div
      className={`min-w-[261px] flex justify-between bg-opacity-[10%] p-[3.5px] border border-opacity-[37%] rounded-full ${`border-phthaloGreen bg-${color}`}`}
    >
      {labels.map((label, i) => (
        <button
          key={i}
          className={`capitalize grow pt-[6.78px] pb-[5.8px] text-sm text-${color} ${
            i === 0
              ? `rounded-full font-semibold bg-${color} bg-opacity-[37%] shadow-sgc`
              : "text-opacity-[37%] font-medium"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
