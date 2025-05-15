"use client";

import { useAppSelector } from "@/app/_hooks/reduxHooks";
import { UserIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { getUser } from "../User/userSlice";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useRef, useState } from "react";
import DropDown from "@/app/_features/Modals/DropDown";
import { useOnClickOutside } from "@/app/_hooks/useOnClickOutside";

function ProfileImage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modalRef = useRef<HTMLButtonElement>(null);
  const user = useAppSelector(getUser);
  const [showModal, setShowModal] = useState(searchParams.get("menu") === "");

  useOnClickOutside(showModal, modalRef, handleClick);

  function handleClick() {
    if (!user) return router.push("/auth");

    const params = new URLSearchParams(searchParams.toString());

    if (!showModal) {
      params.set("menu", "open");
      router.replace(`?${params.toString()}`);
      setShowModal(true);
    } else {
      params.delete("menu");
      router.replace(`?${params.toString()}`);
      setShowModal(false);
    }
  }

  return (
    <div className="absolute w-full top-0 left-0 flex justify-end px-3 sm:px-6 pt-3 text-white text-sm">
      <div className="relative w-min flex flex-col items-end gap-3 z-20">
        <button
          ref={modalRef}
          onClick={handleClick}
          className="w-fit bg-phthaloGreen h-9 px-2 rounded-full flex gap-3 items-center justify-center"
        >
          <UserIcon className="stroke-white w-5 h-5" />
          {!!user && (
            <div className="sw-home-page-sm:flex sm:flex hidden relative top-[1px]  items-center gap-1">
              <span>{user?.name?.split?.(" ")[0] || "login"}</span>
              <ChevronDownIcon
                className={`fill-current w-4 h-4 transition-all ${
                  showModal && "rotate-180"
                }`}
              />
            </div>
          )}
        </button>
        {<DropDown showDropDown={showModal} />}
      </div>
    </div>
  );
}

export default ProfileImage;
