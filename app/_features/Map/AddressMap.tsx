"use client";

import dynamic from "next/dynamic";
import FlexibleModal from "../Modals/FlexibleModal";
import SearchComponent from "../Forms/SearchComponent";
import { NavigationArrow } from "@phosphor-icons/react";
import CircleLoader from "../Loaders/CircleLoader";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Container = dynamic(() => import("./AddressMapContainer"), {
  ssr: false,
});

function Map() {
  const searchParams = useSearchParams();
  const fromUserPosition = searchParams.get("geoposition");
  const router = useRouter();
  const pathname = usePathname();
  const [isLoadingGeoPosition, setIsLoadingGeoPosition] = useState(false);

  function handleToGeoPosition() {
    if (fromUserPosition) {
      const params = new URLSearchParams(searchParams);
      params.delete("geoposition");
      router.replace(`?${params.toString()}`, { scroll: false });
    }
    setTimeout(() => {
      router.push(`${pathname}?geoposition=true`);
    }, 10);
  }

  return (
    <div className="full-viewport">
      <Container
        className="w-full h-[78dvh] sm:h-dvh sm:w-[83vw]"
        setIsLoadingGeoPosition={setIsLoadingGeoPosition}
      />
      <FlexibleModal className="h-[40dvh] w-svw min-w-min sm:h-dvh sm:w-[20vw] sm:rounded-l-2xl sm:rounded-r-none group focus-within:h-[100dvh]">
        <div className="flex flex-col items-center p-3 h-full">
          <SearchComponent placeholder="Search places" />
          <button
            type="button"
            className="flex items-center justify-center gap-1 py-3 px-5 max-w-full text-sm font-semibold text-blue-500  transition-all hover:underline  bg-opacity-10 rounded-full mt-auto"
            onClick={() => {
              if (!isLoadingGeoPosition) handleToGeoPosition();
            }}
          >
            {isLoadingGeoPosition ? (
              <>
                <span className="pr-2 animate-pulse">
                  <CircleLoader
                    size={18}
                    color="#3b82f6"
                    animationDuration="1.5s"
                  />
                </span>
                <span className="animate-pulse">Loading your location...</span>
              </>
            ) : (
              <>
                <NavigationArrow
                  weight="fill"
                  className="rotateX-180 w-5 h-5"
                />
                <span className="relative -bottom-0.5">
                  Go to your current location
                </span>
              </>
            )}
          </button>
        </div>
      </FlexibleModal>
    </div>
  );
}

export default Map;
