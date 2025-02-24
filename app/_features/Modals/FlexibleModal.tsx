function FlexibleModal({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute bg-black-100 z-[9999] bottom-0 right-0 rounded-t-2xl ${className}`}
    >
      {children}
    </div>
  );
}

export default FlexibleModal;
