// TODO: Correctly importing from common packages
// eslint-disable-next-line n/prefer-global/process
const isInEditor = !!(process.env.VSCODE_PID || process.env.JETBRAINS_IDE) && !process.env.CI
const errorWithoutEditor = isInEditor ? 'off' : 'error'

module.exports = {
  plugins: ['react'],
  settings: {
    react: {
      version: '17',
    },
  },
  rules: {
    'jsx-quotes': ['error', 'prefer-double'],
    'react/jsx-boolean-value': 'error',
    'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-curly-brace-presence': [
      'error',
      {
        props: 'never',
        children: 'never',
      },
    ],
    'react/jsx-curly-newline': [
      'error',
      {
        multiline: 'consistent',
        singleline: 'consistent',
      },
    ],
    'react/jsx-curly-spacing': [
      'error',
      {
        attributes: { when: 'never', allowMultiline: true },
        children: { when: 'never', allowMultiline: true },
      },
    ],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-handler-names': 'error',
    'react/jsx-indent': [
      'error',
      2,
      {
        checkAttributes: false,
        indentLogicalExpressions: true,
      },
    ],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-key': [
      'error',
      {
        checkFragmentShorthand: true,
      },
    ],
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-leaked-render': 'error',
    'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],
    'react/jsx-no-undef': ['error', { allowGlobals: true }],
    'react/jsx-no-script-url': 'error',
    'react/jsx-no-useless-fragment': errorWithoutEditor,
    'react/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],
    'react/jsx-sort-props': [
      errorWithoutEditor,
      {
        callbacksLast: true,
        shorthandFirst: true,
        multiline: 'last',
        reservedFirst: true,
      },
    ],
    'react/jsx-pascal-case': ['error', { allowAllCaps: false }],
    'react/jsx-props-no-multi-spaces': 'error',
    'react/jsx-tag-spacing': [
      'error',
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never',
      },
    ],
    'react/jsx-uses-vars': 'error',
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'ignore',
        condition: 'ignore',
        logical: 'ignore',
        prop: 'ignore',
      },
    ],
    'react/no-children-prop': 'error',
    'react/no-string-refs': [
      'error',
      {
        noTemplateLiterals: true,
      },
    ],
    'react/no-unescaped-entities': [
      'error',
      {
        forbid: ['>', '}'],
      },
    ],
    'react/self-closing-comp': errorWithoutEditor,
  },
}
