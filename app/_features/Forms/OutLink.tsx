import Link from "next/link";

function OutLink({ to = "/", text = "", className = "" }) {
  return (
    <Link
      href={to}
      className={`${className} mt-7 text-stone-700 font-bold underline ${className}`}
    >
      {text}
    </Link>
  );
}

export default OutLink;
