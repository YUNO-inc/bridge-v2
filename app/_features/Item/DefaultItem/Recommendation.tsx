import { ItemDTO } from "@/app/_interfaces/interfaces";
import ItemImage from "../ItemImage";

function Recommendations({ rec }: { rec: ItemDTO }) {
  return (
    <div
      role="button"
      className="bg-stone-800 bg-opacity-10 py-2 px-2 rounded-[7px] flex items-center gap-2 text-sm"
    >
      <ItemImage item={rec} />
      <div className="flex flex-col justify-between text-left">
        <p className="w-max max-w-[170px] capitalize">{rec.name}</p>
        <p>₦{rec.price}</p>
      </div>
    </div>
  );
}

export default Recommendations;
