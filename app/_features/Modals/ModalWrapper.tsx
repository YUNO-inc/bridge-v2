function ModalWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute top-[5%] left-[50%] -translate-x-[50%] flex flex-col bg-white rounded-[18px] px-3 w-max max-w-[90%] shadow-sgc-light py-1">
      {children}
    </div>
  );
}

export default ModalWrapper;
