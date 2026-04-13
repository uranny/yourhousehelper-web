import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5B5FC8",
        secondary: "#3BD2A0",
        text: "#FFFFFF",
        "text-sub": "#C2C2C2",
        border: "#343A57",
        background: "#181C2A",
        surface: "#24263B",
      },
    },
  },
};

export default config;