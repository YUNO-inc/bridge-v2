import type { Metadata } from "next";
import "./_styles/global.css";
import { nunito } from "./fonts";

export const metadata: Metadata = {
  title: "Bridge",
  description: "Connect to convenience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className}`}>{children}</body>
    </html>
  );
}
