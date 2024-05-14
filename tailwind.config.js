/** @type {import('tailwindcss').Config} */
export default {
  mode : "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
      }
    },
  },
  plugins: [],
};
