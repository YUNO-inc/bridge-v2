"use client";
import { ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

function BusinessHeaderBackBtn() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="pl-1 pr-3 py-1.5">
      <ArrowLeft className="w-4 h-4 fill-stone-600" />
    </button>
  );
}

export default BusinessHeaderBackBtn;
