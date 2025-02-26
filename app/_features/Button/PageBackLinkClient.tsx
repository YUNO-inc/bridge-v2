"use client";

import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";

function PageBackLinkClient({
  text,
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  const router = useRouter();
  return (
    <Link
      href={"#"}
      onClick={(e) => {
        e.preventDefault();
        router.back();
      }}
      className={`w-fit flex items-center gap-1.5 text-stone-800 font-medium ${className}`}
    >
      <ChevronLeftIcon className="w-6 h-6 fill-current" />
      {text && <span className="capitalize">{text}</span>}
    </Link>
  );
}

export default PageBackLinkClient;
