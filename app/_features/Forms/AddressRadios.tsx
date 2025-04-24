"use client";

import { useAppDispatch, useAppSelector } from "@/app/_hooks/reduxHooks";
import {
  changeAddress,
  deleteAddress,
  getSelectedAddress,
  getUser,
} from "../User/userSlice";
import { AddressDTO } from "@/app/_interfaces/interfaces";
import Radio from "./Radio";
import { MapTrifold } from "@phosphor-icons/react";
import { UpdateMeAction } from "@/app/_lib/actions/user/actions";
import { startTransition, useOptimistic } from "react";
import { updateTotalDeliveryPrice } from "../Cart/cartSlice";

function AddressRadios() {
  const user = useAppSelector(getUser);
  const selectedAddress = useAppSelector(getSelectedAddress);
  if (!user) console.error("no user");
  const dispatch = useAppDispatch();

  const [optimisticAddresses, setOptimisticAddresses] = useOptimistic(
    user?.addresses || []
  );

  async function handleChange(id: AddressDTO["id"]) {
    const newAddress = (address: AddressDTO) => ({
      ...address,
      isSelected: address.id === id,
    });

    startTransition(() => {
      setOptimisticAddresses((prevAddresses) => prevAddresses.map(newAddress));
    });

    const userAddresses = user?.addresses?.map(newAddress);
    await UpdateMeAction(undefined, {
      addresses: userAddresses,
    });
    dispatch(changeAddress(id));
    const newSelectedAddress = userAddresses?.find?.((add) => add.isSelected);
    if (!newSelectedAddress) return;
    dispatch(
      updateTotalDeliveryPrice({
        deliveryAddress: newSelectedAddress,
      })
    );
  }

  async function handleDelete(id: AddressDTO["id"]) {
    if (
      !user?.addresses?.length ||
      !confirm(
        `Are you sure you want to delete ${user.addresses
          .find((address) => address.id === id)
          ?.name.toUpperCase()}`
      )
    )
      return;

    const filterAddress = (address: AddressDTO) => address.id !== id;
    startTransition(() => {
      setOptimisticAddresses((prevAddresses) =>
        prevAddresses.filter(filterAddress)
      );
    });
    await UpdateMeAction(undefined, {
      addresses: user?.addresses?.filter(filterAddress),
    });
    dispatch(deleteAddress(id));

    const isSelectedAddress = id === selectedAddress?.id;
    if (!isSelectedAddress) return;
    dispatch(
      updateTotalDeliveryPrice({
        deliveryAddress: user?.addresses?.[0],
      })
    );
  }

  return (
    <div className="mt-10 mb-5 ">
      {!optimisticAddresses || optimisticAddresses.length < 1 ? (
        <div className="flex flex-col items-center text-stone-200 text-opacity-60">
          <MapTrifold weight="fill" className="w-20 h-20" />
          <div>{"We'd find you anywhere. Bet."}</div>
        </div>
      ) : (
        <div className="px-2 capitalize text-xs font-semibold text-stone-800">
          {optimisticAddresses.map((address) => (
            <Radio
              key={address.id}
              text={address.name}
              value={String(address.coordinates)}
              isChecked={address.isSelected}
              onChange={() => handleChange(address.id)}
              className="py-5 border border-transparent border-b-stone-200 cursor-pointer"
              onDelete={() => handleDelete(address.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AddressRadios;
