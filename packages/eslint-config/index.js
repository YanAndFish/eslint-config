/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ['@antfu', 'plugin:@yafh/vue-recommended'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    '@typescript-eslint/brace-style': ['error', '1tbs'],
  },
}

module.exports = config
