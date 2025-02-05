import { BusinessI } from "@/app/_lib/actions/business/interfaces";
import EdibleItem from "./EdibleItem";

type DefaultItemProps = {
  type?: "edible";
  business: BusinessI;
};

function DefaultItem({ type = "edible", business }: DefaultItemProps) {
  if (type === "edible") return <EdibleItem business={business} />;

  return null;
}

export default DefaultItem;
