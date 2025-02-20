import { useAppDispatch, useAppSelector } from "@/app/_hooks/reduxHooks";
import { AddressDTO } from "@/app/_interfaces/interfaces";
import LocalIcons from "@/app/_utils/LocalIcons";
import { nunito } from "@/app/fonts";
import { BookmarkIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Popup as LeafletPopup, LatLng } from "leaflet";
import { RefObject, useEffect, useRef, useState } from "react";
import { Popup } from "react-leaflet";
import { getUser, setUser } from "../User/userSlice";
import { UpdateMeAction } from "@/app/_lib/actions/user/actions";

function AddressPopup({
  address: receivedAddress,
  position,
  WIDTH_OF_MARKER,
  popupRef,
}: {
  address: Partial<AddressDTO> | string;
  position: LatLng;
  WIDTH_OF_MARKER: number;
  popupRef: RefObject<LeafletPopup | null>;
}) {
  const [address, setAddress] = useState(receivedAddress);
  const [edit, setEdit] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);
  //   const user = useAppSelector(getUser);
  //   const dispatch = useAppDispatch();

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

  async function handleUsePoint() {
    // if (typeof address !== "object") return;
    // if (!address.name?.length || !address.coords?.length) return;
    // console.log({ ...address, isSelected: true });
    // const userAddresses =
    //   user?.addresses?.map((address) => ({
    //     ...address,
    //     isSelected: false,
    //   })) || [];
    // console.log(userAddresses);
    // console.log([...userAddresses, { ...address, isSelected: true }]);
    // const newUser = await UpdateMeAction(undefined, {
    //   addresses: [...userAddresses, { ...address, isSelected: true }],
    // });
    // dispatch(
    //   setUser({
    //     ...user,
    //     addresses: [...userAddresses, { ...address, isSelected: true }],
    //   })
    // );
  }

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
      <div className="bg-background flex items-center justify-between rounded-xl p-2 gap-2 max-w-[90vw]">
        {typeof address === "string" ? (
          <PopupLoader />
        ) : (
          <>
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
            <div className={`min-w-16 w-max text-sm gap-1 ${nunito.className}`}>
              {edit ? (
                <input
                  type="text"
                  value={address.name}
                  className="block outline-phthaloGreen-200 outline-[0.5px] outline-offset-2"
                  ref={editInputRef}
                  onChange={(e) =>
                    setAddress((address) => {
                      if (typeof address === "string") return address;
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
        )}
      </div>
    </Popup>
  );
}

export default AddressPopup;

function PopupLoader() {
  return (
    <div className="w-52 h-10 animate-[pulse_1s_ease-in-out_infinite] duration-1000 flex items-center justify-between gap-3">
      <div className="bg-stone-800 bg-opacity-10 rounded w-5 h-5"></div>
      <div className="grow flex flex-col gap-1">
        <div className="bg-stone-800 bg-opacity-10 rounded w-[90%] h-3"></div>
        <div className="bg-stone-800 bg-opacity-10 rounded w-[50%] h-2"></div>
      </div>
      <div className="bg-stone-800 bg-opacity-10 rounded w-5 h-5"></div>
    </div>
  );
}
