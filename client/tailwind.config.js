/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        robo: ["Roboto", "sans-serif"], // Correct fallback font
      },
      colors: {
        primary: "#0083cb",
        secondary: "#f5f5f5",
        text: "#292929",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite", // Slow spin example
        "spin360": "spin360 2s linear infinite", // Reference to the keyframes below
      },
      keyframes: {
        spin360: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      screens: {
        "height-900": { raw: "(max-height: 900px)" },
        "height-600": { raw: "(max-height: 600px)" },
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  plugins: [],
};
