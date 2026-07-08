/** @type {import('tailwindcss').Config} */
// Tailwind configuration.
// "content" tells Tailwind which files to scan for class names so it can
// generate only the CSS that's actually used (tree-shaking of styles).
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Extend the default theme here as the design system grows
      // (custom colors, fonts, spacing, etc.). Left minimal for now.
    },
  },
  plugins: [],
};
