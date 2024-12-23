import type { Metadata } from "next";
import "./_styles/global.css";

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
      <head>
        <link rel="manifest" href="/manifest.ts" />
      </head>
      <body>{children}</body>
    </html>
  );
}
