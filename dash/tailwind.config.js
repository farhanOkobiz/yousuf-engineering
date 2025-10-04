/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "Arial", "Helvetica", "sans-serif"], // Correct fallback font
      },
      backgroundColor: {
        primary: "#1677FF",
      },
      colors: {
        primary: "#1677FF",
      },
    },
  },
  plugins: [],
};
