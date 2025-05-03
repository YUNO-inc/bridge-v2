import { BusinessDTO, BusinessTypesDTO } from "@/app/_interfaces/interfaces";
import EdibleItem from "./EdibleItem";

type DefaultItemProps = {
  type?: "edible";
  business: BusinessDTO;
  businessType: BusinessTypesDTO;
};

function DefaultItem({
  type = "edible",
  business,
  businessType,
}: DefaultItemProps) {
  if (type === "edible")
    return <EdibleItem business={business} businessType={businessType} />;

  return null;
}

export default DefaultItem;
