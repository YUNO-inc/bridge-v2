import { LinkSimple, QrCode, X } from "@phosphor-icons/react";
import QRCodeComponent from "../QRCode/QRCodeComponent";
import ModalWrapper from "./ModalWrapper";
import { copyToClipboard } from "@/app/_utils/copyToClipboard";

function ScanQRCodeModal({
  url,
  handleCloseModal,
}: {
  url?: string;
  handleCloseModal: () => void;
}) {
  if (!url)
    return (
      <ModalWrapper>
        <div className="flex flex-col items-center font-bold text-app-red-500 text-opacity-70 gap-2 p-2">
          <QrCode className="w-8 h-8" />
          <span>Error Loading QR Code.</span>
        </div>
      </ModalWrapper>
    );

  return (
    <ModalWrapper>
      <div className="relative p-5 flex flex-col items-center gap-3">
        <button
          className="absolute right-1 top-2 p-2 rounded-full hover:bg-phthaloGreen hover:bg-opacity-10"
          onClick={handleCloseModal}
        >
          <X className="min-w-4 min-h-4 w-4 h-4" />
        </button>
        <div className="relative p-[30px] rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-phthaloGreen bg-opacity-10 animate-pulse -z-10"></div>
          <QRCodeComponent url={url} className="rounded-full overflow-hidden" />
        </div>
        <p className="text-sm text-phthaloGreen text-opacity-[0.37] text-center">
          {url}
        </p>
        <div className="flex items-center text-sm gap-1">
          <span>Scan QR code</span>
          <QrCode className="w-6 h-6" />
        </div>
        <button
          className="flex items-center gap-2 bg-phthaloGreen bg-opacity-[0.37] text-phthaloGreen rounded-full shadow-sgc text-sm py-2 px-3 mt-2 active:bg-opacity-10"
          onClick={() => copyToClipboard(url)}
        >
          <span>Copy URL</span>
          <LinkSimple className="w-4 h-4" />
        </button>
      </div>
    </ModalWrapper>
  );
}

export default ScanQRCodeModal;
