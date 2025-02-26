import { useEffect, useState } from "react";
import { NavigationArrow } from "@phosphor-icons/react";
import SearchComponent from "../Forms/SearchComponent";
import FlexibleModal from "./FlexibleModal";
import { usePathname, useRouter } from "next/navigation";
import CircleLoader from "../Loaders/CircleLoader";
import { SearchForTextResult } from "@aws-sdk/client-location";
import { AddressDTO } from "@/app/_interfaces/interfaces";

function NewAddressModal({
  isLoadingGeoPosition,
  setSearchLatLng,
}: {
  isLoadingGeoPosition: boolean;
  setSearchLatLng: React.Dispatch<
    React.SetStateAction<AddressDTO["coords"] | undefined>
  >;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [queryResults, setQueryResults] = useState<SearchForTextResult[]>([]);

  function handleToGeoPosition() {
    router.replace(`${pathname}?geoposition=true`);
  }

  function handleQueryChange(text: string) {
    setSearchText(text);
  }

  useEffect(
    function () {
      const controller = new AbortController();
      const signal = controller.signal;

      async function getLocations() {
        if (searchText.length < 5) return;
        try {
          setIsLoadingPlaces(true);
          const searchResults = await fetch(
            `/api/location?text=${searchText}`,
            {
              signal,
            }
          )
            .then((res) => res.json())
            .then((data) => data);
          setQueryResults(searchResults || []);
          setIsLoadingPlaces(false);
        } catch (err) {
          console.log(err);
        }
      }

      getLocations();
      return () => controller.abort();
    },
    [searchText]
  );

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
            isClearable={isSearching}
            onChange={handleQueryChange}
            onClear={() => {
              setSearchText("");
              setIsSearching(false);
            }}
            onFocus={() => setIsSearching(true)}
          />
        </div>
        {isSearching &&
          (isLoadingPlaces ? (
            <PlaceListsLoading />
          ) : (
            <PlaceLists
              places={queryResults}
              setSearchLatLng={setSearchLatLng}
              setIsSearching={setIsSearching}
            />
          ))}
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

function PlaceLists({
  places,
  setSearchLatLng,
  setIsSearching,
}: {
  places: SearchForTextResult[];
  setSearchLatLng: React.Dispatch<
    React.SetStateAction<AddressDTO["coords"] | undefined>
  >;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  function handleToLatLng({ lat, lng }: { lat?: number; lng?: number }) {
    if (typeof lat !== "number" || typeof lng !== "number") return;
    setSearchLatLng([lat, lng]);
    setIsSearching(false);
  }

  return (
    <div className="w-full mt-8 px-2">
      {places.map((placeObject) => {
        const { Place, PlaceId } = placeObject;
        if (!Place || !PlaceId || !Place.Label) return null;

        const country = Place.Label.split(",").at(-1);
        const address =
          Place.Label.split(",").slice(0, -1).join() ||
          Place?.Street ||
          Place?.SubMunicipality ||
          Place?.Municipality ||
          Place?.Region ||
          "No address found";

        return (
          <button
            key={PlaceId}
            className="w-full text-left text-white py-3 border border-transparent border-b-white last:border-b-transparent border-opacity-[0.37]"
            onClick={() =>
              handleToLatLng({
                lng: Place.Geometry?.Point?.[0],
                lat: Place.Geometry?.Point?.[1],
              })
            }
          >
            <p>{address}</p>
            <p className="text-sm text-white text-opacity-50">
              {address}
              {country && `, ${country}`}
            </p>
          </button>
        );
      })}
    </div>
  );
}

function PlaceListsLoading() {
  return (
    <div className="w-full mt-8 px-2 transition-all">
      {["", "", "", "", ""].map((_, i) => (
        <div
          key={i}
          className="w-full py-3 border border-transparent border-b-white last:border-b-transparent border-opacity-[0.05]"
        >
          <div className="bg-white bg-opacity-[0.03] h-10 rounded-lg"></div>
          {/* <div className="bg-white bg-opacity-[0.02] h-3 rounded-lg w-[50%]"></div> */}
        </div>
      ))}
    </div>
  );
}

export default NewAddressModal;
