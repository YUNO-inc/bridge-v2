import { motion } from "motion/react";
import {
  BuildingLibraryIcon,
  MapPinIcon,
  SpeakerWaveIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useAppSelector } from "@/app/_hooks/reduxHooks";
import MajorLink from "../Button/MajorLink";
import { getUser } from "../User/userSlice";

function DropDown({ showDropDown }: { showDropDown: boolean }) {
  const user = useAppSelector(getUser);
  const userId = user?.id;
  const ADMIN_IDS = process.env.NEXT_PUBLIC_ADMIN_IDS?.split?.(",") ?? [];

  if (!showDropDown) return null;
  return (
    <motion.div
      className="flex flex-col gap-3 backdrop-blur-[100px] rounded-[34px] p-3 text-stone-600"
      style={{
        boxShadow: `rgba(0, 0, 0, 0.2) 0px 2px 8px 0px`,
      }}
    >
      <MajorLink
        icon={<UserIcon className="stroke-current w-6 h-6" />}
        text="Account"
        href="/account"
      />
      <MajorLink
        icon={<MapPinIcon className="stroke-current w-6 h-6" />}
        text="Addresses"
        href="/address"
      />
      <MajorLink
        icon={<SpeakerWaveIcon className="stroke-current w-6 h-6" />}
        text="Feedback / Bugs"
        href="/feedback"
      />
      {(userId?.length && ADMIN_IDS.includes(userId)) ||
      process.env.NODE_ENV === "development" ? (
        <MajorLink
          icon={<BuildingLibraryIcon className="stroke-current w-6 h-6" />}
          text="Admin"
          href="/admin"
        />
      ) : null}
    </motion.div>
  );
}

export default DropDown;
