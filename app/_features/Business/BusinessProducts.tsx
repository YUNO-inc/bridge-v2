import {
  BusinessDTO,
  DEFAULT_COORDS,
  ItemDTO,
} from "@/app/_interfaces/interfaces";
import { auth } from "@/app/_lib/actions/auth/auth";
import ProductItem from "../Item/ProductItem/ProductItem";

async function BusinessProducts({ business }: { business: BusinessDTO }) {
  const session = await auth();
  const userAddresses = session?.user?.addresses;
  const selectedAddressCoords = userAddresses?.length
    ? userAddresses.find((a) => a.isSelected)?.coordinates ||
      userAddresses[0].coordinates
    : DEFAULT_COORDS;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/item?lon=${selectedAddressCoords[0]}&lat=${selectedAddressCoords[1]}&businessId=${business.id}`,
    {
      cache: "force-cache",
    }
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

export default BusinessProducts;
