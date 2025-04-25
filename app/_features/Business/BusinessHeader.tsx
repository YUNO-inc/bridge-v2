import { BusinessDTO } from "@/app/_interfaces/interfaces";
import BusinessHeaderBackBtn from "./BusinessHeaderBackBtn";
import Link from "next/link";

function BusinessHeader({ business }: { business: BusinessDTO }) {
  return (
    <div className="flex items-start">
      <BusinessHeaderBackBtn />
      <div>
        <div className="flex items-center gap-2 leading-none">
          <Link
            href={`/app/${business.slug}`}
            className="text-lg font-semibold transition-all hover:underline"
          >
            {business.name}
          </Link>
          <span className=" shrink-0 w-1 h-1 bg-phthaloGreen bg-opacity-55 rounded-full"></span>
          {business.isOpen ? (
            <span>Open</span>
          ) : (
            <span className="text-opacity-50 text-stone-600">closed</span>
          )}
        </div>
        <div>
          <span className="text-sm">{business.address.name}</span>
        </div>
      </div>
    </div>
  );
}

export default BusinessHeader;
