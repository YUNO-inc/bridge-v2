"use client";

import { useAppDispatch, useAppSelector } from "@/app/_hooks/reduxHooks";
import { getAppData, openModal } from "../App/AppSlice";
import CheckoutModal from "./CheckoutModal";
import ScanQRCodeModal from "./ScanQRCodeModal";

function AppModal() {
  const {
    appModal: { isOpen, type, props },
  } = useAppSelector(getAppData);
  const dispatch = useAppDispatch();

  if (!isOpen) return null;

  function handleCloseModal() {
    dispatch(openModal({ isOpen: false, type: undefined, props: {} }));
  }

  return (
    <div className="z-[999] w-full fixed left-0 top-0">
      <div
        className="w-full h-screen bg-stone-600 bg-opacity-[0.37]"
        onClick={handleCloseModal}
      ></div>
      {type === "checkout" && <CheckoutModal checkoutProps={props.checkout} />}
      {type === "scan-qr-code" && (
        <ScanQRCodeModal
          url={props.scanQRCode?.url}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
}
export default AppModal;
