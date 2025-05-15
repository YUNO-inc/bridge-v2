import { RefObject, useEffect } from "react";

export function useOnClickOutside(
  showDropDown: boolean,
  ref: RefObject<HTMLDivElement | HTMLButtonElement | null>,
  handler: () => void
) {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    if (showDropDown) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showDropDown, handler, ref]);
}
