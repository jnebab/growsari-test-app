module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Changa One", "cursive"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
