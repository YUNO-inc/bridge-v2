import { ItemDTO } from "@/app/_interfaces/interfaces";
import EdibleItem from "./EdibleItem";

type DefaultProductItemProps = {
  type?: "edible";
  item: ItemDTO;
};

function ProductItem({ type = "edible", item }: DefaultProductItemProps) {
  if (type === "edible") return <EdibleItem item={item} />;

  return null;
}

export default ProductItem;
