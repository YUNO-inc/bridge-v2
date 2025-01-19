import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ["app-red"]: {
          "50": "#FFCFCD",
          "100": "#FFA9A4",
          "200": "#FF8680",
          "300": "#FF5E56",
          "400": "#ED463D",
          "500": "#FF3A30",
          "600": "#FF2B20",
          "700": "#F81004",
          "800": "#B10900",
          "900": "#740600",
          "950": "#490400",
        },
        phthaloGreen: {
          "50": "#F1F2F1",
          "100": "#CCD6D1",
          "200": "#749686",
          "300": "#39604D",
          "400": "#204332",
          "500": "#123524",
          "600": "#112A1E",
          "700": "#072517",
          "800": "#01150C",
          "900": "#02110A",
          "950": "#000804",
          DEFAULT: "#123524",
        },
        grey1: "#BFBFBF",
        grey2: "#E0E0E9",
        black: "#000000",
      },
      fontFamily: {
        dune: ["dune", "serif"], // Add your custom font here
      },
      boxShadow: {
        purple: "0px 18px 30px rgba(131, 119, 198, 0.11)",
        sgc: "0px 3px 8px rgba(0, 0, 0, 0.12)",
      },
      keyframes: {
        ["spin-opacity"]: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "spin-stroke": "dash 2s linear infinite",
      },
      screens: {
        sw340: "340px", // Custom breakpoint at 1440px
      },
    },
  },
  plugins: [],
} satisfies Config;
