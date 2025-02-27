function IconAndText({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-1">
      <span className="flex items-center justify-center bg-white rounded-full w-7 h-7 shrink-0">
        {icon}
      </span>
      <p className="text-sm font-semibold">{text}</p>
    </div>
  );
}

export default IconAndText;
