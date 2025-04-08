import ProductItem from "./ProductItem";
import { useAppSelector } from "@/app/_hooks/reduxHooks";
import { getActivity } from "@/app/_features/App/ActivitySlice";

function ProductList() {
  const { productResults: items } = useAppSelector(getActivity);

  return (
    <div className="flex flex-col pl-4 py-4 text-stone-800">
      {items.map((item) => (
        <ProductItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ProductList;
