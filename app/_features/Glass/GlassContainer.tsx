function GlassContainer({
  className,
  wrapperClassName,
  children,
}: {
  className?: string;
  wrapperClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`bg-white/15 rounded-3xl overflow-hidden backdrop-blur-[5px] ${className}`}
    >
      <span
        className={`absolute top-0 left-0 h-full w-full bg-[url('/images/bg/paper.png')] flex items-center ${wrapperClassName}`}
      >
        {children}
      </span>
    </div>
  );
}

export default GlassContainer;
