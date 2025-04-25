import Incrementals from "@/app/_features/Button/Incrementals";
import EdibleItemDeliveryPrice from "@/app/_features/Item/DefaultItem/EdibleItemDeliveryPrice";
import { ItemDTO } from "@/app/_interfaces/interfaces";
import LocalIcons from "@/app/_utils/LocalIcons";
import Image from "next/image";

type PageProps = {
  params: Promise<{
    itemSlug: string;
    businessSlug: string;
  }>;
};

async function Page({ params }: PageProps) {
  const { businessSlug, itemSlug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/item?itemSlug=${itemSlug}&businessSlug=${businessSlug}`
  );
  const item: ItemDTO = await res.json();
  const business = item?.businessData;

  if (typeof business === "string") return null;

  return (
    <div className="pt-2">
      <div className="flex gap-3">
        <div
          className={`relative shrink-0 rounded-[13.333%] overflow-hidden border-none h-20 w-20`}
        >
          <Image
            src={item.image}
            fill
            className="object-cover"
            alt={`Image of ${item.name} by ${
              typeof item.businessData === "string"
                ? "a business"
                : item.businessData.name
            }`}
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-sm font-bold">{item.name}</p>
            <div className="text-sm flex items-center gap-2 text-phthaloGreen-400 text-opacity-[0.67] font-semibold">
              <p>₦{item.price}</p>
              <span className=" shrink-0 w-1 h-1 bg-phthaloGreen bg-opacity-55 rounded-full"></span>
              <span className="flex items-center gap-1">
                <EdibleItemDeliveryPrice
                  pickupPoint={business.address.coordinates}
                  businessId={business.id}
                />
                <LocalIcons
                  name="rider"
                  className="relative -top-[1px] w-3 h-3 fill-transparent"
                  pathClassName={[
                    "fill-current fill-opacity-[0.3] ",
                    "stroke-current stroke-opacity-[0.3] ",
                  ]}
                />
              </span>
            </div>
          </div>
          <Incrementals item={item} />
        </div>
      </div>
      <p className="text-stone-700 text-opacity-[0.67] text-sm py-2 px-2.5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur labore
        molestiae suscipit mollitia sint reiciendis expedita?
      </p>
    </div>
  );
}

export default Page;
