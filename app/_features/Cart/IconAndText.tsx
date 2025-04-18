function IconAndText({
  icon,
  text,
  discountedPrice,
}: {
  icon: React.ReactNode;
  text: string;
  discountedPrice?: string;
}) {
  return (
    <div className="flex items-center gap-1">
      <span className="flex items-center justify-center bg-white rounded-full w-7 h-7 shrink-0">
        {icon}
      </span>
      {discountedPrice ? (
        <p className="text-sm font-semibold">
          <span className="line-through text-opacity-30 text-stone-500">
            {text}
          </span>
          <span className="px-1">{discountedPrice}</span>
        </p>
      ) : (
        <p className="text-sm font-semibold">{text}</p>
      )}
    </div>
  );
}

export default IconAndText;
