/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ['@antfu', 'plugin:@yafh/recommended'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
}

module.exports = config
