import type { Metadata } from "next";
import "./_styles/global.css";
import { nunito } from "./fonts";
import { auth } from "./_lib/actions/auth/auth";
import { SessionProvider } from "next-auth/react";
import StoreProvider from "./_store/StoreProvider";

export const metadata: Metadata = {
  title: "Bridge",
  description: "Connect to convenience",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider>
        <StoreProvider user={session?.user}>
          <body className={`${nunito.className}`}>{children}</body>
        </StoreProvider>
      </SessionProvider>
    </html>
  );
}
