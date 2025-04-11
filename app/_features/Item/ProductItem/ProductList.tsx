import { ItemDTO } from "@/app/_interfaces/interfaces";
import ProductItem from "./ProductItem";

async function ProductList() {
  const items: ItemDTO[] = [];

  return (
    <div className="flex flex-col pl-4 py-4 text-stone-800">
      {items.map((item) => (
        <ProductItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ProductList;
