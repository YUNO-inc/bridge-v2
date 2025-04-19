import { auth } from "@/app/_lib/actions/auth/auth";
import DefaultItem from "./DefaultItem";
import { GetNearBusinessesAction } from "@/app/_lib/actions/business/actions";
import { BusinessDTO, BusinessTypesDTO } from "@/app/_interfaces/interfaces";

async function DefaultList({
  businessType,
}: {
  businessType: BusinessTypesDTO;
}) {
  const session = await auth();
  const user = session?.user;
  let selectedAddress;
  if (user?.addresses?.length) {
    selectedAddress =
      user.addresses.find((a) => a.isSelected) || user.addresses[0];
  }

  const businesses = await GetNearBusinessesAction(
    selectedAddress?.coordinates,
    { businessTypes: [businessType] }
  );

  return (
    <div className="p-2 flex flex-col gap-4">
      {businesses.map((business: BusinessDTO) => (
        <DefaultItem key={business.id} business={business} />
      ))}
    </div>
  );
}

export default DefaultList;
