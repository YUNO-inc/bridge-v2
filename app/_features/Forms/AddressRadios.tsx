"use client";

import { useAppSelector } from "@/app/_hooks/reduxHooks";
import { getUser } from "../User/userSlice";
import { AddressDTO } from "@/app/_interfaces/interfaces";
import Radio from "./Radio";
import { MapTrifold } from "@phosphor-icons/react";

function AddressRadios() {
  const user = useAppSelector(getUser);
  if (!user) console.log("no user");

  const addresses: AddressDTO[] = [
    { name: "Okota police Barracks", coords: [6.034, 4.5], isSelected: true },
    {
      name: "16, dele Ashiru close, Ire Akari, Isolo",
      coords: [6.134, 4.3],
      isSelected: false,
    },
  ];

  return (
    <div className="mt-10 mb-5 ">
      {addresses.length < 1 ? (
        <div className="flex flex-col items-center text-stone-200 text-opacity-60">
          <MapTrifold weight="fill" className="w-20 h-20" />
          <div>{"We'd find you anywhere. Bet."}</div>
        </div>
      ) : (
        <div className="px-2 capitalize text-xs font-semibold text-stone-800">
          {addresses.map((address) => (
            <div
              key={String(address.coords)}
              className="py-5 border border-transparent border-b-stone-200"
            >
              <Radio
                text={address.name}
                value={String(address.coords)}
                isChecked={address.isSelected}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AddressRadios;
