"use client";

import { useRouter } from "next/navigation";
import { RefObject, useEffect, useRef, useState } from "react";
import { Popup as LeafletPopup, LatLng } from "leaflet";
import { Popup } from "react-leaflet";
import { BookmarkIcon, PencilIcon } from "@heroicons/react/24/outline";
import { UpdateMeAction } from "@/app/_lib/actions/user/actions";
import { useAppDispatch, useAppSelector } from "@/app/_hooks/reduxHooks";
import { AddressDTO } from "@/app/_interfaces/interfaces";
import LocalIcons from "@/app/_utils/LocalIcons";
import { nunito } from "@/app/fonts";
import { getUser, setUser } from "../User/userSlice";
import PopupLoader from "./PopupLoader";

function AddressPopup({
  address: receivedAddress,
  position,
  WIDTH_OF_MARKER,
  popupRef,
  isLoading,
}: {
  address: Omit<AddressDTO, "isSelected"> | undefined;
  position: LatLng;
  WIDTH_OF_MARKER: number;
  popupRef: RefObject<LeafletPopup | null>;
  isLoading: boolean;
}) {
  const router = useRouter();
  const [address, setAddress] = useState(receivedAddress);
  const [edit, setEdit] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  useEffect(
    function () {
      function setNewAddress() {
        setAddress(receivedAddress);
        setEdit(false);
        editInputRef.current = null;
      }
      setNewAddress();
    },
    [receivedAddress]
  );

  useEffect(
    function () {
      function focusEditInput() {
        if (edit && editInputRef.current) editInputRef.current.focus();
      }
      focusEditInput();
    },
    [edit]
  );

  const handleUsePoint = async function () {
    if (!address) return;

    const userAddresses =
      user?.addresses?.reduce<AddressDTO[]>((acc, a) => {
        if (a.id === address.id) return acc;
        acc.push({ ...a, isSelected: false });
        return acc;
      }, []) || [];

    const newUser = await UpdateMeAction(undefined, {
      addresses: [...userAddresses, { ...address, isSelected: true }],
    });
    dispatch(setUser(newUser));
    router.push("/address");
  };

  return (
    <Popup
      position={position}
      autoClose={false}
      closeOnClick={false}
      offset={[0, -WIDTH_OF_MARKER]}
      closeButton={false}
      ref={popupRef}
      className="p-0"
    >
      {!isLoading ? (
        <div
          className={`bg-background flex items-center justify-between rounded-xl p-2 gap-2 max-w-[90vw] ${nunito.className}`}
        >
          <div className="bg-phthaloGreen bg-opacity-10 rounded p-2.5">
            <LocalIcons
              name="rider"
              className="w-3.5 h-3.5 fill-transparent"
              pathClassName={[
                "fill-phthaloGreen fill-opacity-[0.3] ",
                "stroke-phthaloGreen stroke-opacity-[0.3] ",
              ]}
            />
          </div>
          {address ? (
            <>
              <div className={`min-w-16 w-max text-sm gap-1`}>
                {edit ? (
                  <input
                    type="text"
                    value={address.name}
                    className="block outline-phthaloGreen-200 outline-[0.5px] outline-offset-2"
                    ref={editInputRef}
                    onChange={(e) =>
                      setAddress((address) => {
                        if (!address) return undefined;
                        return { ...address, name: e.target.value };
                      })
                    }
                    required
                  />
                ) : (
                  <div>{address.name}</div>
                )}
                <button
                  className="capitalize font-extrabold text-phthaloGreen text-opacity-80 hover:underline underline-offset-1"
                  onClick={handleUsePoint}
                >
                  Use This Point
                </button>
              </div>
              <button
                className="flex flex-col items-center justify-center rounded p-2.5"
                onMouseUp={() => {
                  if (address?.name?.length) setEdit((edit) => !edit);
                  else editInputRef.current?.focus?.();
                }}
              >
                {edit ? (
                  <>
                    <BookmarkIcon className="text-opacity-60 stroke-current w-[18px] h-[18px]" />
                    <div className="text-[11px] font-semibold">Save</div>
                  </>
                ) : (
                  <>
                    <PencilIcon className="text-opacity-60 stroke-current w-[18px] h-[18px]" />
                    <div className="text-[11px] font-semibold">Edit</div>
                  </>
                )}
              </button>
            </>
          ) : (
            <div className="w-max text-stone-800 text-opacity-60">
              No address found
            </div>
          )}
        </div>
      ) : (
        <PopupLoader />
      )}
    </Popup>
  );
}

export default AddressPopup;
