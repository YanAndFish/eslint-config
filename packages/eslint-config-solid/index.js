module.exports = {
  plugins: ['solid'],
  extends: ['@antfu/eslint-config-ts', 'plugin:@yafh/solid-recommended', '@yafh/eslint-config-jsx'],
  rules: {
    // identifier usage is important
    'solid/jsx-no-undef': 'error',
    'solid/jsx-uses-vars': 'error',
    'solid/no-unknown-namespaces': 'error',
    // security problems
    'solid/no-innerhtml': 'warn',
    'solid/jsx-no-script-url': 'error',
    // reactivity
    'solid/components-return-once': 'error',
    'solid/no-destructure': 'error',
    'solid/prefer-for': 'error',
    'solid/reactivity': 'error',
    'solid/event-handlers': 'error',
    // these rules are mostly style suggestions
    'solid/imports': 'error',
    'solid/style-prop': ['error', { allowString: true }],
    'solid/no-react-deps': 'error',
    'solid/no-react-specific-props': 'error',
    'solid/no-array-handlers': 'error',
    // handled by Solid compiler, opt-in style suggestion
    'solid/prefer-show': 'off',
    // only necessary for resource-constrained environments
    'solid/no-proxy-apis': 'off',
    // deprecated
    'solid/prefer-classlist': 'off',

    // handle for eslint-plugin-react
    'solid/jsx-no-duplicate-props': 'off',
    'solid/self-closing-comp': 'off',
  },
}
