/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "#232323",
        secondary: "#969696",
        light: "#FFFFFF",
        accent: "#367AFF",
        tertiary: "#9A9A9A",
        aclline: "#D9D9D9",
        aclline2: "#6E6E6E",
      },
      fontSize: {
        xs: "var(--font-xs)",
        sm: "var(--font-sm)",
        md: "var(--font-md)",
        lg: "var(--font-lg)",
        xl: "var(--font-xl)",
        "2xl": "40px",
      },
      boxShadow: {
        custom: "1px 1px 8px #D9D9D9, 1px 1px 3px #D9D9D9",
        "custom-dark": "1px 1px 8px #232323, 1px 1px 3px #232323",
      },
    },
  },
  plugins: [],
};
