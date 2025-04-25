import { auth } from "@/app/_lib/actions/auth/auth";
import ProductItem from "./ProductItem";
import { DEFAULT_COORDS, ItemDTO } from "@/app/_interfaces/interfaces";

async function ProductList({ searchStr }: { searchStr: string }) {
  const session = await auth();
  const userAddresses = session?.user?.addresses;
  const selectedAddressCoords = userAddresses?.length
    ? userAddresses.find((a) => a.isSelected)?.coordinates ||
      userAddresses[0].coordinates
    : DEFAULT_COORDS;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/item/search?searchStr=${searchStr}&lon=${selectedAddressCoords[0]}&lat=${selectedAddressCoords[1]}`
  );
  const items: ItemDTO[] = await res.json();

  return (
    <div className="flex flex-col pl-4 py-4 text-stone-800">
      {items.map((item) => (
        <ProductItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ProductList;
