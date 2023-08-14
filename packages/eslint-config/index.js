/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ['@antfu'],
  plugins: ['@yafh/yafh'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
}

module.exports = config
