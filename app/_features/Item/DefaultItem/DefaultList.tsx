import { BusinessDTO } from "@/app/_interfaces/interfaces";
import DefaultItem from "./DefaultItem";

function DefaultList({ businesses }: { businesses: BusinessDTO[] }) {
  return (
    <div className="p-2 flex flex-col gap-4">
      {businesses.map((business) => (
        <DefaultItem key={business.name} business={business} />
      ))}
    </div>
  );
}

export default DefaultList;
