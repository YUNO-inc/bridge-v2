"use client";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import CircleLoader from "../Loaders/CircleLoader";

function MajorLinkClient({
  icon,
  text,
  href,
  className,
  elementType = "link",
  onClick,
  isLoading = false,
}: {
  icon?: React.ReactNode;
  text: string;
  href?: string;
  className?: string;
  elementType?: "button" | "link";
  onClick?: () => void;
  isLoading?: boolean;
}) {
  const innerHtml = isLoading ? (
    <span className="m-auto">
      <CircleLoader color="#123524" size={20} />
    </span>
  ) : (
    <>
      <span className="flex items-center gap-[14px]">
        {icon}
        <span className="capitalize text-lg">{text}</span>
      </span>
      <ChevronRightIcon className="fill-current w-6 h-6 ml-3" />
    </>
  );

  if (elementType === "button")
    return (
      <button
        onClick={onClick}
        className={`flex items-center justify-between rounded-[calc(34px-12px)] p-[10px] hover:bg-[#5E5E5E14] ${className}`}
      >
        {innerHtml}
      </button>
    );
  if (elementType === "link")
    return (
      <Link
        href={href || `/${text.toLocaleLowerCase()}`}
        className={`flex items-center justify-between rounded-[calc(34px-12px)] p-[10px] text-stone-600 hover:bg-[#5E5E5E14] ${className}`}
      >
        {innerHtml}
      </Link>
    );
}

export default MajorLinkClient;
