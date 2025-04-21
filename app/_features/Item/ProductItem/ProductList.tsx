import { auth } from "@/app/_lib/actions/auth/auth";
import ProductItem from "./ProductItem";
import { GetItemsAction } from "@/app/_lib/actions/item/actions";
import { DEFAULT_COORDS } from "@/app/_interfaces/interfaces";

async function ProductList({ searchStr }: { searchStr: string }) {
  const session = await auth();
  const userAddresses = session?.user?.addresses;
  const selectedAddressCoords = userAddresses?.length
    ? userAddresses.find((a) => a.isSelected)?.coordinates ||
      userAddresses[0].coordinates
    : DEFAULT_COORDS;
  const items = await GetItemsAction(searchStr, selectedAddressCoords);

  return (
    <div className="flex flex-col pl-4 py-4 text-stone-800">
      {items.map((item) => (
        <ProductItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ProductList;
