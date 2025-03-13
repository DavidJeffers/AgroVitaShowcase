import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import { config, configs } from "typescript-eslint";
import reactCompiler from "eslint-plugin-react-compiler";

/** @type {import('eslint').Config} */
export default config(
  eslint.configs.recommended,
  ...configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  reactCompiler.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.es2022,
        ...globals.serviceworker,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      sourceType: "module",
    },
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": ["warn"],
      "@typescript-eslint/no-unused-vars": [
        "warn", // or "error"
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "no-unused-vars": "off",
      "react/no-unknown-property": [
        "error",
        {
          ignore: ["variant"],
        },
      ],
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/resolver": {
        typescript: {},
      },
      react: {
        version: "19.0.0",
      },
    },
  },
  {
    ignores: [
      "**/+types/*",
      "**/build/*",
      "**/dist/*",
      "**/generated/*",
      "**/node_modules/*",
      "**/types/*",
      "**/public/*",
    ],
  },
  prettier
);
