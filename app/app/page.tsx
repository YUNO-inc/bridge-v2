import ActivityItem from "../_features/App/ActivityContainer/ActivityItem";
import DefaultList from "../_features/Item/DefaultItem/DefaultList";
import ProductList from "../_features/Item/ProductItem/ProductList";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function Page({ searchParams }: PageProps) {
  const searchStr = (await searchParams).search ?? "";
  const isSearching = searchStr.length > 0;

  return (
    <>
      <ActivityItem show={!isSearching}>
        <DefaultList />
      </ActivityItem>
      <ActivityItem show={isSearching}>
        <ProductList />
      </ActivityItem>
    </>
  );
}

export default Page;
