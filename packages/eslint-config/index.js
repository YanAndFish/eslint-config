/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ['@antfu', 'plugin:@yafh/recommended-vue'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    '@typescript-eslint/brace-style': ['error', '1tbs'],
  },
}

module.exports = config
