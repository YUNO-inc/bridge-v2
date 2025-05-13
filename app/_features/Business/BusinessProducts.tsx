import {
  BusinessDTO,
  DEFAULT_COORDS,
  ItemDTO,
} from "@/app/_interfaces/interfaces";
import { auth } from "@/app/_lib/auth/auth";
import ProductItem from "../Item/ProductItem/ProductItem";
import Link from "next/link";

async function BusinessProducts({ business }: { business: BusinessDTO }) {
  const session = await auth();
  const userAddresses = session?.user?.addresses;
  const selectedAddressCoords = userAddresses?.length
    ? userAddresses.find((a) => a.isSelected)?.coordinates ||
      userAddresses[0].coordinates
    : DEFAULT_COORDS;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/item/search?lon=${selectedAddressCoords[0]}&lat=${selectedAddressCoords[1]}&businessId=${business.id}`
  );
  const items: ItemDTO[] = await res.json();

  return (
    <div className="pt-2">
      <p>
        {`More from `}
        <Link
          href={`/app/${business.slug}`}
          className="font-semibold transition-all hover:underline"
        >
          {business.name}
        </Link>
      </p>
      <div className="flex flex-col px-3 py-3 text-stone-800">
        {items.map((item) => (
          <ProductItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default BusinessProducts;
