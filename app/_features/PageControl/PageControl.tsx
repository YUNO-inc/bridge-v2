import { anonymousPro } from "@/app/fonts";

type PageControlProps = {
  text?: string;
};

export default function PageControl({ text }: PageControlProps) {
  if (text)
    return (
      <div
        className={`bg-testc px-3 py-2 max-h-6 opacity-[44%] rounded-full flex items-center justify-center text-black text-opacity-45 text-sm ${anonymousPro.className}`}
      >
        {text}
      </div>
    );

  return (
    <div className="bg-testc px-3 py-2 max-h-6 opacity-[44%] rounded-full flex items-center justify-center">
      dots
    </div>
  );
}
