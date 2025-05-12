import { useAppDispatch, useAppSelector } from "@/app/_hooks/reduxHooks";
import { useDebounce } from "@/app/_hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAppData, setLoading } from "../AppSlice";

function SearchInput() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [searchStr, setSearchStr] = useState("");
  const debouncedQuery = useDebounce(searchStr, 500);

  const { businessTypes, placeholders } = useAppSelector(getAppData);
  const params = useSearchParams();
  const currentBT = params.get("bt")?.toLowerCase?.();
  let btIndex = businessTypes.findIndex((bt) => bt.toLowerCase() === currentBT);
  btIndex = btIndex >= 0 ? btIndex : 0;
  const placeholder = placeholders[btIndex];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (debouncedQuery) {
      dispatch(setLoading({ isLoading: true, page: "search" }));
      params.set("search", debouncedQuery);
      router.replace(`/app?${params.toString()}`);
    } else {
      params.delete("search");
      router.replace(`?${params.toString()}`);
    }
  }, [debouncedQuery, router, dispatch]);

  return (
    <input
      type="text"
      className="grow bg-transparent outline-none h-full px-[6px] rounded-[8px] focus:bor"
      placeholder={placeholder}
      onChange={(e) => setSearchStr(e.target.value)}
    />
  );
}

export default SearchInput;
