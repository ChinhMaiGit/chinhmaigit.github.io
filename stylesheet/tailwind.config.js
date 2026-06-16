/** @type {import('tailwindcss').Config} */
// Design-system Tailwind theme. Merge into a new app's tailwind.config.js.
// `darkMode: "class"` is required — theming is driven by a `.dark` class on <html>.
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0f172a", 700: "#1e3a5f", 800: "#162032", 900: "#0c1525" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
