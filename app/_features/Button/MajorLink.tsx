import { ChevronRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

function MajorLink({
  icon,
  text,
  href,
  className,
}: {
  icon?: React.ReactNode;
  text: string;
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href || `/${text.toLocaleLowerCase()}`}
      className={`flex items-center justify-between rounded-[calc(34px-12px)] p-[10px] text-stone-600 hover:bg-[#5E5E5E14] ${className}`}
    >
      <span className="flex items-center gap-[14px]">
        {icon}
        <span className="capitalize text-lg text-nowrap">{text}</span>
      </span>
      <ChevronRightIcon className="fill-current w-6 h-6 ml-3" />
    </Link>
  );
}

export default MajorLink;
