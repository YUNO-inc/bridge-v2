"use client";

import { useAppDispatch, useAppSelector } from "@/app/_hooks/reduxHooks";
import { getAppData, setLoading } from "../App/AppSlice";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import EdibleItemLoader from "./EdibleItemLoader";
import ProductItemLoader from "./ProductItemLoader";

function ActivityTypeLoader() {
  const searchParams = useSearchParams();
  const btQuery = searchParams.get("bt");
  const searchQuery = searchParams.get("search");
  const {
    loading: { isLoading, page },
  } = useAppSelector(getAppData);
  const dispatch = useAppDispatch();

  useEffect(
    function () {
      dispatch(setLoading({ isLoading: false }));
    },
    [btQuery, searchQuery, dispatch]
  );

  return (
    <div
      className={`absolute top-0 left-0 bg-[#f2f2f2] h-full shrink-0 w-full rounded-[25px] overflow-x-hidden overflow-y-auto z-20 ${
        isLoading ? "block" : "hidden"
      }`}
    >
      {page === "default" && (
        <div className="p-2 flex flex-col gap-4">
          <EdibleItemLoader />
          <EdibleItemLoader />
        </div>
      )}
      {page === "search" && (
        <div className="pl-4 py-4">
          <ProductItemLoader />
          <ProductItemLoader />
          <ProductItemLoader />
          <ProductItemLoader />
          <ProductItemLoader />
        </div>
      )}
    </div>
  );
}

export default ActivityTypeLoader;
