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
      },
      fontFamily: {
        dune: ["dune", "serif"], // Add your custom font here
      },
    },
  },
  plugins: [],
} satisfies Config;
