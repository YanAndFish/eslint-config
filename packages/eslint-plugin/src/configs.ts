const commonRule = {
  '@yafh/icon-component-prefix': 'error',
  '@yafh/no-cjs-icon-component': 'error',
  '@yafh/no-multiple-slash-comment': 'error',
}

function rules(rules: any) {
  return {
    plugins: ['@yafh'],
    rules: {
      ...commonRule,
      ...rules,
    },
  }
}

export default {
  'recommended': rules({}),
  'vue-recommended': rules({
    '@yafh/no-index-vue': 'error',
    '@yafh/pascal-case-component-name': 'error',
  }),
  'solid-recommended': rules({
    '@yafh/pascal-case-component-name': ['error', ['tsx', 'jsx']],
    '@yafh/jsx-no-danger-with-children': 'error',
  }),
}
