/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // blue-600
        primaryDark: "#1e40af", // blue-800
        accent: "#60a5fa", // blue-400
      },
    },
  },
  plugins: [],
};
