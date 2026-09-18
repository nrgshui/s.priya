/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ["Anton", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        brand: {
          orange: "#F4845F",
          green: "#6BBF7A",
          pink: "#E882B4",
          blue: "#6EB5FF",
          yellow: "#F5A623",
          coral: "#FF7B90",
          teal: "#20B2AA",
          purple: "#B388FF",
        },
      },
    },
  },
  plugins: [],
};