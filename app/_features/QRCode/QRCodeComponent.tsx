"use client";

import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

type QRProps = {
  url: string;
};

export default function QRCodeComponent({ url }: QRProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrInstance = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    // Create QR instance once
    qrInstance.current = new QRCodeStyling({
      width: 300,
      height: 300,
      shape: "circle",
      data: url,
      type: "svg",
      image: "/images/first-logo.png", // optional
      margin: 30,
      dotsOptions: {
        color: "#123524",
        type: "extra-rounded",
      },
      cornersSquareOptions: {
        type: "square",
      },
      cornersDotOptions: {
        type: "square",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 0,
      },
    });

    if (qrRef.current) {
      qrInstance.current.append(qrRef.current);
    }

    const copiedCurrent = qrRef.current!;

    // Update data if url changes
    return () => {
      if (copiedCurrent) copiedCurrent.innerHTML = ""; // cleanup on unmount or re-render
    };
  }, [url]);

  useEffect(() => {
    if (qrInstance.current) {
      qrInstance.current.update({ data: url });
    }
  }, [url]);

  return <div ref={qrRef} />;
}
