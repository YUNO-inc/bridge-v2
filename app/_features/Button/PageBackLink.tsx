import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

function PageBackLink({
  text,
  href = "/app",
  className = "",
}: {
  text?: string;
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`w-fit flex items-center gap-1.5 text-stone-800 font-medium ${className}`}
    >
      <ChevronLeftIcon className="w-6 h-6 fill-current" />
      {text && <span className="capitalize">{text}</span>}
    </Link>
  );
}

export default PageBackLink;
