import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: {
          "50": "#ecfdfa",
          "100": "#d0fbf2",
          "200": "#a6f4e8",
          "300": "#6de8dd",
          "400": "#32d5cc",
          "500": "#0ebbb7",
          "600": "#039898",
          "700": "#037679",
          "800": "#055e60",
          "900": "#054c4f",
          "950": "#011c1e",
        },
        secondary: {
          "50": "#f0f9f3",
          "100": "#daf1e0",
          "200": "#b8e2c7",
          "300": "#89cca5",
          "400": "#6cba8e",
          "500": "#359461",
          "600": "#25764d",
          "700": "#1d5f3f",
          "800": "#1a4b33",
          "900": "#163e2c",
          "950": "#0b2318",
        },
        tertiary: {
          "50": "#fefce8",
          "100": "#fffac2",
          "200": "#fff388",
          "300": "#ffe443",
          "400": "#ffd110",
          "500": "#efb703",
          "600": "#d18f00",
          "700": "#a46404",
          "800": "#874e0c",
          "900": "#734010",
          "950": "#432005",
        },
        accent: {
          "50": "#f7f3ff",
          "100": "#f3ecfe",
          "200": "#e5d6fe",
          "300": "#d2b6fc",
          "400": "#bd8cf9",
          "500": "#a95df5",
          "600": "#9f3bec",
          "700": "#9029d8",
          "800": "#7822b5",
          "900": "#631e94",
          "950": "#3e1164",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
