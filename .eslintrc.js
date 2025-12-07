 module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["react", "react-refresh", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    // Disable unused vars errors
    "@typescript-eslint/no-unused-vars": "off",

    // Disable "unexpected any"
    "@typescript-eslint/no-explicit-any": "off",

    // Disable Vite refresh annoying rule
    "react-refresh/only-export-components": "off",

    // Quiet some React/TS noise
    "no-unused-vars": "off",
    "react/prop-types": "off"
  },
};
