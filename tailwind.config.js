/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{tsx,jsx,js,vue,ts}"],
  prefix: "tw-",
  theme: {
    extend: {
      colors: {
        blue: { DEFAULT: "#007AFF" },
        gray: {
          DEFAULT: "#96A0B6",
          border: "#F1F3F9",
        },
      },
    },
    screens: {
      xxxs: "320px",
      xxs: "375px",
      xs: "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1440px",
      xxxl: "1536px",
      xxxxl: "1900px",
    },
  },
  plugins: [],
};
