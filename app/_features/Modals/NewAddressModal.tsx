import { useState } from "react";
import { NavigationArrow } from "@phosphor-icons/react";
import SearchComponent from "../Forms/SearchComponent";
import FlexibleModal from "./FlexibleModal";
import { usePathname, useRouter } from "next/navigation";
import CircleLoader from "../Loaders/CircleLoader";

function NewAddressModal({
  isLoadingGeoPosition,
}: {
  isLoadingGeoPosition: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  function handleToGeoPosition() {
    router.push(`${pathname}?geoposition=true`);
  }

  return (
    <FlexibleModal
      className={`w-svw min-w-min sm:h-dvh sm:w-[20vw] sm:rounded-l-2xl sm:rounded-r-none ${
        isSearching ? "h-[100dvh]" : "h-[40dvh]"
      }`}
    >
      <div className={`flex flex-col items-center p-3 h-full`}>
        <div
          className={`${
            isSearching ? "w-full" : "w-fit"
          } sm:w-fit min-w-[70vw] sm:min-w-[auto]`}
        >
          <SearchComponent
            placeholder="Search places"
            searchText={searchText}
            setSearchText={setSearchText}
            isClearable={isSearching}
            onClear={() => {
              console.log("clearing");
              setIsSearching(false);
            }}
            onFocus={() => setIsSearching(true)}
          />
        </div>
        {isSearching && (
          <div>
            <p>Big</p>
          </div>
        )}
        <button
          type="button"
          className="flex items-center justify-center gap-1 py-3 px-5 max-w-full text-sm font-semibold text-blue-500 transition-all hover:underline  bg-opacity-10 rounded-full mt-auto"
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
              <NavigationArrow weight="fill" className="rotateX-180 w-5 h-5" />
              <span className="relative -bottom-0.5">
                Go to your current location
              </span>
            </>
          )}
        </button>
      </div>
    </FlexibleModal>
  );
}

export default NewAddressModal;
