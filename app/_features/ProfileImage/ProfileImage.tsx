"use client";
import { useAppSelector } from "@/app/_hooks/reduxHooks";
// COULD AND SHOULD be a server component.
import { UserIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { getUser } from "../User/userSlice";

function ProfileImage() {
  const router = useRouter();
  const user = useAppSelector(getUser);

  function handleClick() {
    if (!user) router.push("/auth");
  }

  return (
    <div className="absolute w-full top-0 left-0 flex justify-end px-3 sm:px-6 pt-3">
      <button
        onClick={handleClick}
        className="bg-phthaloGreen h-9 w-9 rounded-full flex items-center justify-center"
      >
        <UserIcon className="stroke-white w-5 h-5" />
      </button>
    </div>
  );
}

export default ProfileImage;
