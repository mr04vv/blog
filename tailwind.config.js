/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./app/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Hiragino Kaku Gothic ProN", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
