import { nextJsConfig } from "@monorepo/eslint-config/nextjs";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextJsConfig,
  {
    ignores: [".next/**", "node_modules/**"],
  }
];
