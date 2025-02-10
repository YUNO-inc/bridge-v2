import { MapPinIcon, UserIcon } from "@heroicons/react/24/outline";
import MajorLink from "../Button/MajorLink";
import { motion } from "motion/react";

function DropDown({ showDropDown }: { showDropDown: boolean }) {
  if (!showDropDown) return null;
  return (
    <motion.div
      className="flex flex-col gap-3 backdrop-blur-[100px] rounded-[34px] p-3"
      style={{
        boxShadow: `rgba(0, 0, 0, 0.2) 0px 2px 8px 0px`,
      }}
    >
      <MajorLink
        icon={<UserIcon className="stroke-current w-6 h-6" />}
        text="Account"
      />
      <MajorLink
        icon={<MapPinIcon className="stroke-current w-6 h-6" />}
        text="Addresses"
      />
    </motion.div>
  );
}

export default DropDown;
