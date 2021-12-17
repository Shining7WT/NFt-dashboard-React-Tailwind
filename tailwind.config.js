// tailwind.config.js
module.exports = {
  purge: [],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        'stepperWidth': '37.375rem',
        'tableWidth': '1400px',
        'createIssueFormWidth': '600px',
        'createIssueStepperWidth': '750px',
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        stxblue: {
          light: "#5546ff",
          DEFAULT: "#5546ff",
          dark: "#5546ff",
        },
        black: {
          light: "#000",
          DEFAULT: "#000",
          dark: "#000",
        },
        white: {
          light: "#fff",
          DEFAULT: "#fff",
          dark: "#fff",
        },
        lbGray: {
          light: "#8D8D8D",
          DEFAULT: "#8D8D8D",
          dark: "#8D8D8D",
        },
        lbBlack: {
          light: "#1F1F1F",
          DEFAULT: "#1F1F1F",
          dark: "#1F1F1F",
        },
        bgGray: {
          light: "#F8F8F8",
          DEFAULT: "#F8F8F8",
          dark: "#F8F8F8",
        },
        bgBlack: {
          light: "#1D1D1D",
          DEFAULT: "#1D1D1D",
          dark: "#1D1D1D"
        },
      },
      inset: {
        '18': '4.5rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-scrollbar"),
  ],
};
