// Lint rules for the whole repo. `npm run lint` must pass before a PR can merge (CI checks it).
// The naming rule below is what keeps everyone writing userName, not user_name or UserName.
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";

export default [
  { ignores: ["**/dist/**", "**/node_modules/**"] },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      camelcase: ["error", { properties: "never", ignoreDestructuring: true }],
      "no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^[A-Z_]" }],
      eqeqeq: "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  {
    files: ["client/**/*.{js,jsx}"],
    languageOptions: { globals: globals.browser },
    plugins: { "react-hooks": reactHooks },
    rules: reactHooks.configs.recommended.rules,
  },
  {
    files: ["server/**/*.js", "shared/**/*.js", "*.js"],
    languageOptions: { globals: globals.node },
    rules: { "no-console": "off" },
  },
  prettier,
];
