"use client";

import { useAppDispatch, useAppSelector } from "@/app/_hooks/reduxHooks";
import { changeAddress, deleteAddress, getUser } from "../User/userSlice";
import { AddressDTO } from "@/app/_interfaces/interfaces";
import Radio from "./Radio";
import { MapTrifold } from "@phosphor-icons/react";
import { UpdateMeAction } from "@/app/_lib/actions/user/actions";
import { startTransition, useOptimistic } from "react";

function AddressRadios() {
  const user = useAppSelector(getUser);
  if (!user) console.log("no user");
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

    console.log("BEFORE", user?.addresses);
    await UpdateMeAction(undefined, {
      addresses: user?.addresses?.map(newAddress),
    });
    console.log("AFTER");
    dispatch(changeAddress(id));
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
              value={String(address.coords)}
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

// useEffect(function () {
//   async function addy() {
//     await UpdateMeAction(undefined, {
//       addresses: [
//         { name: "Okota Police Barracks", coords: [6, 4], isSelected: true },
//         {
//           name: "16, Dele ashiru street. Ire-akari, Isolo.",
//           coords: [6.4, 4.6],
//           isSelected: true,
//         },
//         {
//           name: "Chemist Bus-stop Ire-Akari",
//           coords: [6.135, 4.835687],
//           isSelected: false,
//         },
//         {
//           name: "Kajaola Ultra-morder market Cele",
//           coords: [6.765, 4.7563],
//           isSelected: false,
//         },
//       ],
//     });
//   }
//   addy();
// }, []);
