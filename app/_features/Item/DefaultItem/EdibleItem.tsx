import Link from "next/link";
import { BusinessDTO, RecommendationDTO } from "@/app/_interfaces/interfaces";
import LocalIcons from "@/app/_utils/LocalIcons";
import Image from "next/image";
import Recommendation from "./Recommendation";
import EdibleItemDeliveryPrice from "./EdibleItemDeliveryPrice";

type EdibleItemProps = { business: BusinessDTO };

function EdibleItem({ business }: EdibleItemProps) {
  const defaultRec: RecommendationDTO = { businessType: "shawarma", items: [] };
  const recommendations =
    business.recommendations.find((rec) => rec.businessType === "shawarma") ||
    defaultRec;

  return (
    <button className="flex flex-col gap-2 w-full bg-stone-800 bg-opacity-5 rounded-[13px] p-3 text-stone-800">
      <Link
        href={`/app/${business.slug}`}
        className="flex items-center justify-between w-full text-sm"
      >
        <div className="relative w-9 h-9 rounded-full overflow-hidden mr-3">
          <Image
            src={`/images/${business.profileImg}`}
            alt={`${business.name} Profile Image`}
            className="object-cover"
            fill
          />
        </div>
        <div className="grow text-left">
          <div className="text-[15px] font-semibold capitalize overflow-hidden whitespace-nowrap text-ellipsis">
            {business.name}
          </div>
          <div className="space-x-3">
            <span>{business.address.name}</span>
            <span className="border-r border-r-phthaloGreen border-opacity-40"></span>
            <span className="text-stone-800 text-opacity-60">
              {business.isOpen ? "Open" : "Closed"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <EdibleItemDeliveryPrice
            deliveryPrice={business.deliveryPrice}
            pickupPoint={business.address.coordinates}
            businessId={business.id}
          />
          <span className="relative bottom-[1px]">
            <LocalIcons
              name="rider"
              className="w-[14px] h-[14px] fill-transparent"
              pathClassName={["fill-stone-800", "stroke-stone-800"]}
            />
          </span>
        </div>
      </Link>
      {!!business.recommendations.length && (
        <div className="flex space-x-3 items-center w-full overflow-auto">
          {recommendations.items.map((rec) => {
            if (typeof rec === "string") return null;

            rec.businessData = {
              id: business.id,
              name: business.name,
              deliveryPrice: business.deliveryPrice,
              address: business.address,
              slug: business.slug,
            };
            return <Recommendation key={rec.id} rec={rec} />;
          })}
        </div>
      )}
    </button>
  );
}

export default EdibleItem;
