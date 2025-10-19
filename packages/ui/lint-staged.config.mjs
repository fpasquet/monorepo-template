/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{js,mjs,ts,tsx,md,mdx,json}': 'prettier --write',
  '*.{ts,tsx}': 'eslint --fix',
};
