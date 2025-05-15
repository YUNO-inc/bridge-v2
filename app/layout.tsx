import type { Metadata, Viewport } from "next";
import "./_styles/global.css";
import { nunito } from "./fonts";
import { auth } from "./_lib/auth/auth";
import { SessionProvider } from "next-auth/react";
import StoreProvider from "./_store/StoreProvider";
import AppModal from "./_features/Modals/AppModal";

export const metadata: Metadata = {
  title: "Bridge",
  description: "Connect to convenience",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <StoreProvider user={session?.user}>
          <body className={`${nunito.className}`}>
            <AppModal />
            <div>{children}</div>
          </body>
        </StoreProvider>
      </SessionProvider>
    </html>
  );
}
