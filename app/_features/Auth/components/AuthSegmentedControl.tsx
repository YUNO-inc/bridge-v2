"use client";

import { usePathname, useRouter } from "next/navigation";
import SegmentedControl from "../../SegmentedControl/SegmentedControl";

type AuthSegmentedControlProps = {
  availablePages: string[];
  page: string;
};

export default function AuthSegmentedControl({
  availablePages,
  page,
}: AuthSegmentedControlProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (pageName: string) => {
    router.push(`${pathname}?page=${pageName}`, { scroll: false });
  };

  return (
    <SegmentedControl
      labels={availablePages}
      activeIndex={availablePages.indexOf(page.toLocaleLowerCase())}
      handleClick={handleClick}
    />
  );
}
