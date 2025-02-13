"use client";

import { useAppDispatch, useAppSelector } from "@/app/_hooks/reduxHooks";
import { addNewAddress, changeAddress, getUser } from "../User/userSlice";
import { AddressDTO } from "@/app/_interfaces/interfaces";
import Radio from "./Radio";
import { MapTrifold } from "@phosphor-icons/react";
import { useEffect, useMemo } from "react";

function AddressRadios() {
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  if (!user) console.log("no user");

  const addresses: AddressDTO[] = useMemo(() => {
    return [
      {
        id: "1",
        name: "Okota police Barracks",
        coords: [6.034, 4.5],
        isSelected: true,
      },
      {
        id: "2",
        name: "16, dele Ashiru close, Ire Akari, Isolo",
        coords: [6.134, 4.3],
        isSelected: false,
      },
    ];
  }, []);

  useEffect(
    function () {
      function addAdd() {
        if (!user) return;
        if (!user.addresses?.length || user.addresses?.length < 2)
          addresses.forEach((address) => dispatch(addNewAddress(address)));
      }
      addAdd();
    },
    [user, dispatch, addresses]
  );

  function handleChange(id: AddressDTO["id"]) {
    dispatch(changeAddress(id));
  }

  return (
    <div className="mt-10 mb-5 ">
      {!user?.addresses || user.addresses.length < 1 ? (
        <div className="flex flex-col items-center text-stone-200 text-opacity-60">
          <MapTrifold weight="fill" className="w-20 h-20" />
          <div>{"We'd find you anywhere. Bet."}</div>
        </div>
      ) : (
        <div className="px-2 capitalize text-xs font-semibold text-stone-800">
          {user.addresses.map((address) => (
            <Radio
              key={address.id}
              text={address.name}
              value={String(address.coords)}
              isChecked={address.isSelected}
              onChange={() => handleChange(address.id)}
              className="py-5 border border-transparent border-b-stone-200 cursor-pointer"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AddressRadios;
