import { BusinessDTO } from "@/app/_interfaces/interfaces";
import EdibleItem from "./EdibleItem";

type DefaultItemProps = {
  type?: "edible";
  business: BusinessDTO;
};

function DefaultItem({ type = "edible", business }: DefaultItemProps) {
  if (type === "edible") return <EdibleItem business={business} />;

  return null;
}

export default DefaultItem;
