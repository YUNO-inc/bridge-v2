"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import NewAddressModal from "../Modals/NewAddressModal";
import { AddressDTO } from "@/app/_interfaces/interfaces";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/_hooks/reduxHooks";
import { getUser } from "../User/userSlice";

const Container = dynamic(() => import("./AddressMapContainer"), {
  ssr: false,
});

function Map() {
  const router = useRouter();
  const user = useAppSelector(getUser);
  const userId = user?.id ? String(user.id) : undefined;
  const [isLoadingGeoPosition, setIsLoadingGeoPosition] = useState(false);
  const [searchLonLat, setSearchLonLat] = useState<
    AddressDTO["coordinates"] | undefined
  >(undefined);

  useEffect(() => {
    if (!userId) router.push("/app");
  }, [router, userId]);

  return (
    <div className="full-viewport">
      <Container
        className="w-full h-[78dvh] sm:h-dvh sm:w-[83vw]"
        setIsLoadingGeoPosition={setIsLoadingGeoPosition}
        searchLonLat={searchLonLat}
      />
      <NewAddressModal
        isLoadingGeoPosition={isLoadingGeoPosition}
        setSearchLonLat={setSearchLonLat}
      />
    </div>
  );
}

export default Map;
