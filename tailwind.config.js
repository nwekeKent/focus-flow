// @ts-nocheck

/** @type {import('tailwindcss').Config} */
const { Colors } = require("./constants/colors");

module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./constants/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: Colors,

      fontFamily: {
        // We use the string names exactly as they appear in your useFonts hook
        kumbh: ["KumbhSans"],
        "kumbh-bold": ["KumbhSans-Bold"],

        roboto: ["RobotoSlab"],
        "roboto-bold": ["RobotoSlab-Bold"],

        mono: ["SpaceMono"],
        "mono-bold": ["SpaceMono-Bold"],
      },
    },
  },
  plugins: [],
};
