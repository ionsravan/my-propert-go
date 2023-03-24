/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope"],
      },
      colors: {
        primaryBlue: "#0078DB",
        primaryDark: "#151C22",
        TitleColor: "#1B1C57",
        locColor: "#828282",
        cityBg: "#001338",
      },
      screens: {
        "8xl": "1350px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
