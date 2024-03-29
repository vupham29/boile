/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "./app/**/*.{js, ts}"],

  corePlugins: {
    container: false,
  },

  theme: {
    extend: {
      colors: {
        primary: "#C97164",
        white: "#F9F1E7",
        gray: "#EFEEF1",
        black: "#37384c",
      },

      fontFamily: {
        primary: "sans-serif",
        secondary: "sans-serif",
      },

      screens: {
        "mobile-small": { max: "26.56em" }, // 425px
        mobile: { max: "30em" }, // 480px

        "tablet-v": { max: "48em" }, // 768px
        "tablet-h": { max: "64em" }, // 1024px

        "touches-device": { max: "73.75em" }, // 1180px
      },
    },
  },
  plugins: [],
};
