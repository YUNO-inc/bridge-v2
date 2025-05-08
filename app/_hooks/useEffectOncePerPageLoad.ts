import { useEffect } from "react";

export function useEffectOncePerPageLoad(
  callback: () => void,
  key = "default"
) {
  useEffect(() => {
    const flagKey = `__effectHasRun__${key}`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(window as any)[flagKey]) {
      callback();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any)[flagKey] = true;
    }
  }, [callback, key]);
}
