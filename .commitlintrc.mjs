/**
 * @type {import("@commitlint/types").UserConfig}
 */
const commitlintConfig = {
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
};

export default commitlintConfig;
