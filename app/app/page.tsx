import ActivityItem from "../_features/App/ActivityContainer/ActivityItem";
import DefaultList from "../_features/Item/DefaultItem/DefaultList";
import ProductList from "../_features/Item/ProductItem/ProductList";
import { BUSINESS_TYPES, BusinessTypesDTO } from "../_interfaces/interfaces";

interface PageProps {
  searchParams: {
    bt: BusinessTypesDTO;
    [key: string]: string | string[] | undefined;
  };
}

async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const searchStr = params.search ?? "";
  const businessType = params.bt ?? BUSINESS_TYPES[0];
  const isSearching = searchStr.length > 0;

  return (
    <>
      <ActivityItem show={!isSearching}>
        <DefaultList businessType={businessType} />
      </ActivityItem>
      <ActivityItem show={isSearching}>
        <ProductList />
      </ActivityItem>
    </>
  );
}

export default Page;
