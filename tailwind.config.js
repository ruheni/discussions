module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    minHHeight: {
      "1/2": "50%",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
