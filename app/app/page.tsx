"use client";

import { getActivity } from "@/app/_features/App/ActivitySlice";
import { useAppSelector } from "@/app/_hooks/reduxHooks";
import ActivityItem from "../_features/App/ActivityContainer/ActivityItem";
import DefaultList from "../_features/Item/DefaultItem/DefaultList";
import ProductList from "../_features/Item/ProductItem/ProductList";

function Page() {
  const { searchStr, businesses } = useAppSelector(getActivity);
  const isSearching = searchStr.length > 0;

  return (
    <>
      <ActivityItem show={!isSearching}>
        <DefaultList businesses={businesses} />
      </ActivityItem>
      <ActivityItem show={isSearching}>
        <ProductList />;
      </ActivityItem>
    </>
  );
}

export default Page;
