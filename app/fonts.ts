import { Anonymous_Pro, Noto_Sans_JP, Nunito } from "next/font/google";

export const anonymousPro = Anonymous_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const notoSansJap = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
