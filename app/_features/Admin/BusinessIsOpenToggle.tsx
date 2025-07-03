"use client";
import { BusinessDTO } from "@/app/_interfaces/interfaces";
import ToggleControl from "../SegmentedControl/ToggleControl";
import { startTransition, useOptimistic, useState } from "react";
import { ToggleBusinessOpenStateAction } from "@/app/_lib/admin/actions";

function BusinessIsOpenToggle({
  id,
  isOpen: bizIsOpen,
}: {
  id: BusinessDTO["id"];
  isOpen: BusinessDTO["isOpen"];
}) {
  const [isOpen, setIsOpen] = useState(bizIsOpen);
  const [optimisticIsOpen, setOptimisticIsOpen] = useOptimistic(
    isOpen,
    (prev, newValue: boolean) => newValue
  );

  async function changeToggle() {
    const newIsOpen = !optimisticIsOpen;
    startTransition(() => {
      setOptimisticIsOpen(newIsOpen);
    });
    await ToggleBusinessOpenStateAction({ id, isOpen: newIsOpen });
    setIsOpen((i) => !i);
  }

  return <ToggleControl isOn={optimisticIsOpen} changeToggle={changeToggle} />;
}

export default BusinessIsOpenToggle;
