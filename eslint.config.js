import { FlatCompat } from "@eslint/eslintrc";
import tsParser from "@typescript-eslint/parser";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  {
    ignores: ["node_modules/**", "out/**"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
    },
  },
  ...compat.config({
    extends: ["next/core-web-vitals"],
  }),
];
