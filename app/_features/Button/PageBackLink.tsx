import {
  //   ArrowLeftIcon,
  //   ArrowLongLeftIcon,
  ChevronLeftIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";

function PageBackLink({ text }: { text: string }) {
  return (
    <Link
      href={"/"}
      className="flex items-center gap-1.5 text-stone-800 font-medium"
    >
      <ChevronLeftIcon className="w-6 h-6 fill-current" />
      <span className="capitalize">{text}</span>
    </Link>
  );
}

export default PageBackLink;
