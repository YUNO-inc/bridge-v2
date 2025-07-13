"use client";

import { useAppDispatch } from "@/app/_hooks/reduxHooks";
import { QrCode } from "@phosphor-icons/react/dist/ssr";
import { openModal } from "../App/AppSlice";

function ScanQRBtn({ origin }: { origin: string }) {
  const dispatch = useAppDispatch();

  function handleClick() {
    try {
      dispatch(
        openModal({
          isOpen: true,
          type: "scan-qr-code",
          props: { scanQRCode: { url: origin } },
        })
      );
    } catch {
      dispatch(
        openModal({
          isOpen: true,
          type: "scan-qr-code",
          props: {},
        })
      );
    }
  }

  return (
    <button
      className="flex gap-1 flex-col items-center bg-white b-opacity-[0.37] rounded-[16px] py-2 px-4 max-w-28 hover:bg-phthaloGreen hover:text-white active:bg-phthaloGreen active:text-phthaloGreen active:bg-opacity-10"
      onClick={handleClick}
    >
      <p>Tap to scan QR code</p>
      <QrCode className="w-7 h-7" />
    </button>
  );
}

export default ScanQRBtn;
