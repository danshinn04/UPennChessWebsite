import { PluginAPI } from 'tailwindcss/types/config';
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    function addVariablesForColors({ addBase, theme }: PluginAPI) {
      let allColors = flattenColorPalette(theme("colors"));
      
      // Ensure newVars is a string-to-string mapping
      let newVars: Record<string, string> = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, String(val)])
      );
      
      addBase({
        ":root": newVars,
      });
    },
  ],
};
